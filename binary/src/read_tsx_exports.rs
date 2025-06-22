use crate::src_file::SrcFile;
use crate::ts_exports::TSExports;
use crate::ts_parser::parse_ts_file;
use std::path::Path;
use swc_ecma_ast::{ModuleDecl, ModuleItem, DefaultDecl, ExportSpecifier};

pub fn read_tsx_exports(src_file: &SrcFile) -> Result<TSExports, String> {
    let path = Path::new(&src_file.path);
    let is_tsx = path.extension()
        .map_or(false, |ext| ext.to_string_lossy().to_lowercase() == "tsx");
    
    if !is_tsx {
        return Err("Not a TSX file".to_string());
    }
    
    let module = parse_ts_file(src_file)?;
    let mut ts_exports = TSExports::new();
    
    for item in &module.body {
        if let ModuleItem::ModuleDecl(decl) = item {
            match decl {
                ModuleDecl::ExportDefaultDecl(export_default) => {
                    match &export_default.decl {
                        DefaultDecl::Class(class_expr) => {
                            if let Some(ident) = &class_expr.ident {
                                ts_exports.default_export = Some(ident.sym.to_string());
                            } else if let Some(filename) = Path::new(&src_file.path).file_stem() {
                                ts_exports.default_export = Some(filename.to_string_lossy().to_string());
                            }
                        },
                        DefaultDecl::Fn(fn_expr) => {
                            if let Some(ident) = &fn_expr.ident {
                                ts_exports.default_export = Some(ident.sym.to_string());
                            } else if let Some(filename) = Path::new(&src_file.path).file_stem() {
                                ts_exports.default_export = Some(filename.to_string_lossy().to_string());
                            }
                        },
                        _ => {}
                    }
                },
                ModuleDecl::ExportDefaultExpr(export_expr) => {
                    if let swc_ecma_ast::Expr::Ident(ident) = &*export_expr.expr {
                        ts_exports.default_export = Some(ident.sym.to_string());
                    }
                },
                ModuleDecl::ExportNamed(named_export) => {
                    if let Some(src) = &named_export.src {
                        let source_path = src.value.to_string();
                        ts_exports.reexport_sources.push(source_path.clone());
                        
                        for spec in &named_export.specifiers {
                            if let ExportSpecifier::Named(named_spec) = spec {
                                let export_name = match &named_spec.exported {
                                    Some(exported_name) => match exported_name {
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
                    }
                },
                ModuleDecl::ExportAll(export_all) => {
                    let source_path = export_all.src.value.to_string();
                    ts_exports.reexport_sources.push(source_path);
                    ts_exports.has_star_export = true;
                },
                ModuleDecl::ExportDecl(export_decl) => {
                    match &export_decl.decl {
                        swc_ecma_ast::Decl::Fn(fn_decl) => {
                            ts_exports.named_exports.push(fn_decl.ident.sym.to_string());
                        },
                        swc_ecma_ast::Decl::Var(var_decl) => {
                            for decl in &var_decl.decls {
                                if let swc_ecma_ast::Pat::Ident(ident) = &decl.name {
                                    ts_exports.named_exports.push(ident.id.sym.to_string());
                                }
                            }
                        },
                        swc_ecma_ast::Decl::Class(class_decl) => {
                            ts_exports.named_exports.push(class_decl.ident.sym.to_string());
                        },
                        _ => {}
                    }
                },
                _ => {}
            }
        }
    }
    
    Ok(ts_exports)
} 