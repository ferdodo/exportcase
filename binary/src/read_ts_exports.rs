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

pub fn read_ts_exports(src_file: &SrcFile) -> Result<TSExports, String> {
    let cm: Lrc<SourceMap> = Default::default();
    let handler = Handler::with_tty_emitter(ColorConfig::Auto, true, false, Some(cm.clone()));
    
    let file_path = Path::new(&src_file.path);
    let fm = cm.load_file(file_path)
        .map_err(|e| format!("Impossible de charger le fichier: {}", e))?;
    
    let syntax = Syntax::Typescript(Default::default());
    
    let lexer = Lexer::new(
        syntax,
        Default::default(),
        StringInput::from(&*fm),
        None,
    );
    
    let mut parser = Parser::new_from(lexer);
    
    let module = parser.parse_module()
        .map_err(|e| format!("Erreur lors du parsing: {:?}", e))?;
    
    let mut ts_exports = TSExports {
        default_export: None,
        named_exports: Vec::new(),
    };
    
    for item in &module.body {
        match item {
            ModuleItem::ModuleDecl(decl) => match decl {
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
                
                ModuleDecl::ExportDefaultExpr(ExportDefaultExpr { expr, .. }) => {
                    if let swc_ecma_ast::Expr::Ident(ident) = &**expr {
                        ts_exports.default_export = Some(ident.sym.to_string());
                    }
                },
                
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

fn extract_var_name(pat: &swc_ecma_ast::Pat) -> Option<String> {
    use swc_ecma_ast::Pat;
    
    match pat {
        Pat::Ident(ident) => Some(ident.id.sym.to_string()),
        _ => None,
    }
} 