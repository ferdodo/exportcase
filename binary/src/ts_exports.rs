/// 1-based line and column in a source file.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Position {
    pub line: usize,
    pub col: usize,
}

impl Default for Position {
    fn default() -> Self {
        Position { line: 1, col: 1 }
    }
}

#[derive(Debug, Default)]
pub struct TSExports {
    pub default_export: Option<String>,
    pub named_exports: Vec<String>,
    pub has_star_export: bool,
    pub reexport_sources: Vec<String>,
    pub first_export_pos: Option<Position>,
    pub star_export_pos: Option<Position>,
    pub default_pos: Option<Position>,
}
