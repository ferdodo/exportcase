use crate::src_file::SrcFile;
use crate::ts_exports::TSExports;
use crate::ts_parser::parse_ts_file;
use swc_ecma_ast::{
    Decl, DefaultDecl, ExportDecl, ExportDefaultDecl, ExportDefaultExpr, ExportSpecifier,
    ModuleDecl, ModuleItem,
};

pub fn read_ts_exports(src_file: &SrcFile) -> Result<TSExports, String> {
    let module = parse_ts_file(src_file)?;
    
    let mut ts_exports = TSExports::default();
    
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
                    Decl::TsInterface(ts_interface) => {
                        ts_exports.named_exports.push(ts_interface.id.sym.to_string());
                    },
                    Decl::TsTypeAlias(ts_type) => {
                        ts_exports.named_exports.push(ts_type.id.sym.to_string());
                    },
                    Decl::TsEnum(ts_enum) => {
                        ts_exports.named_exports.push(ts_enum.id.sym.to_string());
                    },
                    Decl::TsModule(ts_module) => {
                        if let swc_ecma_ast::TsModuleName::Ident(ident) = &ts_module.id {
                            ts_exports.named_exports.push(ident.sym.to_string());
                        }
                    },
                    _ => {},
                },
                
                ModuleDecl::ExportNamed(named_export) => {
                    if named_export.src.is_some() {
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
                    } else {
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