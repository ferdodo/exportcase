use crate::src_file::SrcFile;
use std::fs::{self, File};
use std::io::Write;
use std::path::{Path, PathBuf};
use std::env::temp_dir;
use std::time::{SystemTime, UNIX_EPOCH};

// Imports SWC corrigés
use swc_common::errors::{ColorConfig, Handler};
use swc_common::sync::Lrc;
use swc_common::SourceMap;
use swc_common::FileName;
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax};

/// Transpile un fichier TSX en fichier TS temporaire en utilisant SWC
///
/// Cette fonction utilise SWC pour transformer un fichier TSX en TypeScript
/// standard sans JSX, ce qui permet ensuite de l'analyser avec read_ts_exports.
/// 
/// Si la transpilation échoue, elle retourne une erreur et le programme s'arrête.
/// Il n'y a pas de méthode de secours.
pub fn transpile_tsx_to_ts(src_file: &SrcFile) -> Result<SrcFile, String> {
    // Vérifier si le fichier est vraiment un TSX
    let path = Path::new(&src_file.path);
    let is_tsx = path.extension()
        .map_or(false, |ext| ext.to_string_lossy().to_lowercase() == "tsx");
    
    // Si ce n'est pas un TSX, retourner le SrcFile original
    if !is_tsx {
        return Ok(SrcFile {
            path: src_file.path.clone()
        });
    }
    
    // Lire le contenu du fichier TSX
    let tsx_content = fs::read_to_string(&src_file.path)
        .map_err(|e| format!("Impossible de lire le fichier TSX: {}", e))?;
    
    // Générer un fichier TypeScript simplifié à partir du TSX
    let ts_content = extract_exports_from_tsx(&tsx_content, &src_file.path)?;
    
    // Créer un nom de fichier unique basé sur le timestamp
    let timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|e| format!("Erreur de temps système: {}", e))?
        .as_millis();
    
    let temp_dir = temp_dir();
    let file_stem = path.file_stem()
        .and_then(|s| s.to_str())
        .ok_or_else(|| "Impossible d'extraire le nom du fichier".to_string())?;
    
    let temp_ts_path = temp_dir.join(format!("{}_{}_.ts", file_stem, timestamp));
    
    // Écrire le contenu dans un fichier temporaire
    write_temp_file(&temp_ts_path, &ts_content)?;
    
    // Retourner un nouveau SrcFile pointant vers le fichier temporaire
    Ok(SrcFile {
        path: temp_ts_path.to_string_lossy().to_string()
    })
}

/// Parser le contenu TSX et extraire les exports
fn extract_exports_from_tsx(content: &str, file_path: &str) -> Result<String, String> {
    // Initialiser le source map et le handler
    let cm: Lrc<SourceMap> = Default::default();
    let _handler = Handler::with_tty_emitter(ColorConfig::Auto, true, false, Some(cm.clone()));
    
    // Créer un nouveau fichier source
    let fm = cm.new_source_file(
        Lrc::new(FileName::Custom(file_path.to_string())),
        content.to_string(),
    );
    
    // Configurer pour le parsing TSX
    // Utiliser la syntaxe TypeScript avec tsx activé
    let ts_config = Default::default();
    
    // Définir tsx: true manuellement dans la config de syntaxe
    let syntax = if let Syntax::Typescript(ref mut config) = Syntax::Typescript(ts_config) {
        config.tsx = true;
        Syntax::Typescript(config.clone())
    } else {
        Syntax::Typescript(ts_config)
    };
    
    let lexer = Lexer::new(
        syntax,
        Default::default(),
        StringInput::from(&*fm),
        None,
    );
    
    let mut parser = Parser::new_from(lexer);
    
    // Parser le module
    let module = parser.parse_module()
        .map_err(|e| format!("Erreur lors du parsing du fichier TSX '{}': {:?}", file_path, e))?;
    
    // Extraire les exports manuellement depuis l'AST
    let mut result = String::new();
    result.push_str("// TypeScript file generated from TSX\n\n");
    
    // Parcourir l'AST et extraire les exports
    for item in &module.body {
        if let swc_ecma_ast::ModuleItem::ModuleDecl(decl) = item {
            match decl {
                swc_ecma_ast::ModuleDecl::ExportDecl(export_decl) => {
                    match &export_decl.decl {
                        swc_ecma_ast::Decl::Class(class_decl) => {
                            result.push_str(&format!("export class {} {{}}\n", 
                                class_decl.ident.sym));
                        },
                        swc_ecma_ast::Decl::Fn(fn_decl) => {
                            result.push_str(&format!("export function {}() {{}}\n", 
                                fn_decl.ident.sym));
                        },
                        swc_ecma_ast::Decl::Var(var_decl) => {
                            for decl in &var_decl.decls {
                                if let swc_ecma_ast::Pat::Ident(ident_pat) = &decl.name {
                                    result.push_str(&format!("export const {} = {{}};\n", 
                                        ident_pat.id.sym));
                                }
                            }
                        },
                        _ => {}
                    }
                },
                swc_ecma_ast::ModuleDecl::ExportDefaultDecl(export_default) => {
                    match &export_default.decl {
                        swc_ecma_ast::DefaultDecl::Class(class_expr) => {
                            if let Some(ident) = &class_expr.ident {
                                result.push_str(&format!("export default class {} {{}}\n", 
                                    ident.sym));
                            } else {
                                // Pour les classes anonymes, utiliser le nom du fichier
                                if let Some(filename) = Path::new(file_path).file_stem() {
                                    let filename_str = filename.to_string_lossy();
                                    result.push_str(&format!("export default class {} {{}}\n", filename_str));
                                } else {
                                    result.push_str("export default class {}\n");
                                }
                            }
                        },
                        swc_ecma_ast::DefaultDecl::Fn(fn_expr) => {
                            if let Some(ident) = &fn_expr.ident {
                                result.push_str(&format!("export default function {}() {{}}\n", 
                                    ident.sym));
                            } else {
                                // Pour les fonctions anonymes, utiliser le nom du fichier
                                if let Some(filename) = Path::new(file_path).file_stem() {
                                    let filename_str = filename.to_string_lossy();
                                    result.push_str(&format!("export default function {}() {{}}\n", filename_str));
                                } else {
                                    result.push_str("export default function() {}\n");
                                }
                            }
                        },
                        _ => {
                            // Autres types d'export par défaut
                            result.push_str("export default {}\n");
                        }
                    }
                },
                swc_ecma_ast::ModuleDecl::ExportDefaultExpr(export_expr) => {
                    // Pour les expressions, on essaie d'obtenir un nom
                    let expr = &*export_expr.expr;
                    if let swc_ecma_ast::Expr::Ident(ident) = expr {
                        result.push_str(&format!("export default {};\n", ident.sym));
                    } else {
                        // Export par défaut d'une expression anonyme, utiliser le nom du fichier
                        if let Some(filename) = Path::new(file_path).file_stem() {
                            let filename_str = filename.to_string_lossy();
                            result.push_str(&format!("export default const {} = {{}};\n", filename_str));
                        } else {
                            result.push_str("export default {};\n");
                        }
                    }
                },
                swc_ecma_ast::ModuleDecl::ExportNamed(named_export) => {
                    for spec in &named_export.specifiers {
                        if let swc_ecma_ast::ExportSpecifier::Named(named_spec) = spec {
                            let export_name = match &named_spec.exported {
                                Some(exported_name) => match exported_name {
                                    swc_ecma_ast::ModuleExportName::Ident(ident) => 
                                        ident.sym.to_string(),
                                    swc_ecma_ast::ModuleExportName::Str(str) => 
                                        str.value.to_string(),
                                },
                                None => match &named_spec.orig {
                                    swc_ecma_ast::ModuleExportName::Ident(ident) => 
                                        ident.sym.to_string(),
                                    swc_ecma_ast::ModuleExportName::Str(str) => 
                                        str.value.to_string(),
                                },
                            };
                            result.push_str(&format!("export const {} = {{}};\n", export_name));
                        }
                    }
                },
                _ => {}
            }
        }
    }
    
    // Si aucun export n'a été trouvé, on crée un fichier vide avec commentaire
    if result.lines().count() <= 1 {
        result.push_str("// Aucun export trouvé dans ce fichier\n");
    }
    
    Ok(result)
}

/// Écrit le contenu dans un fichier temporaire
fn write_temp_file(temp_path: &PathBuf, content: &str) -> Result<(), String> {
    let mut file = File::create(temp_path)
        .map_err(|e| format!("Impossible de créer le fichier temporaire: {}", e))?;
    
    file.write_all(content.as_bytes())
        .map_err(|e| format!("Impossible d'écrire dans le fichier temporaire: {}", e))?;
    
    Ok(())
}

/// Structure pour stocker les fichiers temporaires à nettoyer à la fin de l'exécution
pub struct TempFileCleaner {
    temp_files: Vec<String>,
}

impl TempFileCleaner {
    /// Crée un nouveau gestionnaire de nettoyage
    pub fn new() -> Self {
        TempFileCleaner {
            temp_files: Vec::new(),
        }
    }
    
    /// Ajoute un fichier temporaire à la liste
    pub fn add(&mut self, src_file: &SrcFile) {
        // N'ajouter que s'il s'agit d'un fichier temporaire
        let temp_dir_str = temp_dir().to_string_lossy().to_string();
        
        if src_file.path.contains("_") && 
           src_file.path.ends_with(".ts") && 
           src_file.path.contains(&temp_dir_str) {
            self.temp_files.push(src_file.path.clone());
        }
    }
    
    /// Nettoie tous les fichiers temporaires
    pub fn cleanup(&self) {
        for path in &self.temp_files {
            let _ = fs::remove_file(path);
        }
    }
} 