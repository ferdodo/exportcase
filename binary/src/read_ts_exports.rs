use crate::src_file::SrcFile;
use crate::ts_exports::TSExports;
use std::path::Path;
use swc_common::errors::{ColorConfig, Handler};
use swc_common::sync::Lrc;
use swc_common::SourceMap;
use swc_ecma_ast::{
    Decl, DefaultDecl, ExportDecl, ExportDefaultDecl, ExportDefaultExpr, ExportSpecifier,
    ModuleDecl, ModuleItem, 
};
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax};

/// Lit les exports d'un fichier TypeScript
///
/// # Arguments
/// * `src_file` - Le fichier source TypeScript à analyser
///
/// # Returns
/// Une structure TSExports contenant les exports du fichier
pub fn read_ts_exports(src_file: &SrcFile) -> Result<TSExports, String> {
    // Créer les structures de base pour le parsing SWC
    let cm: Lrc<SourceMap> = Default::default();
    let handler = Handler::with_tty_emitter(ColorConfig::Auto, true, false, Some(cm.clone()));
    
    // Charger le fichier source
    let file_path = Path::new(&src_file.path);
    let fm = cm.load_file(file_path)
        .map_err(|e| format!("Impossible de charger le fichier: {}", e))?;
    
    // Configurer l'analyseur lexical et syntaxique avec une approche simplifiée
    // On utilise uniquement la syntaxe TypeScript standard (pas de TSX)
    let syntax = Syntax::Typescript(Default::default());
    
    let lexer = Lexer::new(
        syntax,
        Default::default(),
        StringInput::from(&*fm),
        None,
    );
    
    let mut parser = Parser::new_from(lexer);
    
    // Parser le module
    let module = parser.parse_module()
        .map_err(|e| format!("Erreur lors du parsing: {:?}", e))?;
    
    // Initialiser la structure des exports
    let mut ts_exports = TSExports {
        default_export: None,
        named_exports: Vec::new(),
    };
    
    // Parcourir tous les éléments du module et extraire les exports
    for item in &module.body {
        match item {
            ModuleItem::ModuleDecl(decl) => match decl {
                // Export par défaut
                ModuleDecl::ExportDefaultDecl(ExportDefaultDecl { decl, .. }) => {
                    match decl {
                        DefaultDecl::Class(class_expr) => {
                            if let Some(ident) = &class_expr.ident {
                                ts_exports.default_export = Some(ident.sym.to_string());
                            }
                        },
                        DefaultDecl::Fn(fn_expr) => {
                            if let Some(ident) = &fn_expr.ident {
                                ts_exports.default_export = Some(ident.sym.to_string());
                            }
                        },
                        _ => {},
                    }
                },
                
                // Export d'expression par défaut (ex: export default myFunc)
                ModuleDecl::ExportDefaultExpr(ExportDefaultExpr { expr, .. }) => {
                    if let swc_ecma_ast::Expr::Ident(ident) = &**expr {
                        ts_exports.default_export = Some(ident.sym.to_string());
                    }
                },
                
                // Export de déclarations nommées (ex: export const myFunc = ...)
                ModuleDecl::ExportDecl(ExportDecl { decl, .. }) => match decl {
                    Decl::Class(class_decl) => {
                        ts_exports.named_exports.push(class_decl.ident.sym.to_string());
                    },
                    Decl::Fn(fn_decl) => {
                        ts_exports.named_exports.push(fn_decl.ident.sym.to_string());
                    },
                    Decl::Var(var_decl) => {
                        for decl in &var_decl.decls {
                            if let Some(name) = extract_var_name(&decl.name) {
                                ts_exports.named_exports.push(name);
                            }
                        }
                    },
                    _ => {},
                },
                
                // Export de noms spécifiques (ex: export { myFunc, MyComponent })
                ModuleDecl::ExportNamed(named_export) => {
                    for spec in &named_export.specifiers {
                        if let ExportSpecifier::Named(named_spec) = spec {
                            let export_name = match &named_spec.exported {
                                Some(exported_name) => match exported_name {
                                    // Dans les nouvelles versions, ModuleExportName est une enum
                                    swc_ecma_ast::ModuleExportName::Ident(ident) => ident.sym.to_string(),
                                    swc_ecma_ast::ModuleExportName::Str(str) => str.value.to_string(),
                                },
                                None => match &named_spec.orig {
                                    swc_ecma_ast::ModuleExportName::Ident(ident) => ident.sym.to_string(),
                                    swc_ecma_ast::ModuleExportName::Str(str) => str.value.to_string(),
                                },
                            };
                            ts_exports.named_exports.push(export_name);
                        }
                    }
                },
                
                _ => {},
            },
            
            _ => {},
        }
    }
    
    Ok(ts_exports)
}

// Fonction utilitaire pour extraire le nom d'un motif de variable
fn extract_var_name(pat: &swc_ecma_ast::Pat) -> Option<String> {
    use swc_ecma_ast::Pat;
    
    match pat {
        Pat::Ident(ident) => Some(ident.id.sym.to_string()),
        _ => None,
    }
} 