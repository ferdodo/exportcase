#[derive(Debug, Default)]
pub struct TSExports {
    pub default_export: Option<String>,
    pub named_exports: Vec<String>,
    pub has_star_export: bool,
    pub reexport_sources: Vec<String>,
}
