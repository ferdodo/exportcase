use crate::ts_exports::{Position, TSExports};
use swc_common::{BytePos, SourceMap};
use swc_ecma_ast::ModuleDecl;

/// Records the line and column of export statements, so rules can point at them.
pub fn track_positions(ts: &mut TSExports, decl: &ModuleDecl, cm: &SourceMap, lo: BytePos) {
    let is_default = matches!(decl, ModuleDecl::ExportDefaultDecl(_) | ModuleDecl::ExportDefaultExpr(_));
    let is_star = matches!(decl, ModuleDecl::ExportAll(_));
    let is_export = is_default || is_star || matches!(decl, ModuleDecl::ExportDecl(_) | ModuleDecl::ExportNamed(_));
    if !is_export {
        return;
    }

    let loc = cm.lookup_char_pos(lo);
    let pos = Position { line: loc.line, col: loc.col.0 + 1 };
    ts.first_export_pos.get_or_insert(pos);
    if is_star {
        ts.star_export_pos.get_or_insert(pos);
    }
    if is_default {
        ts.default_pos.get_or_insert(pos);
    }
}
