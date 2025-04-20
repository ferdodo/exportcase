#[derive(Debug, Default)]
pub struct TSExports {
    /// L'export par défaut, s'il existe
    pub default_export: Option<String>,
    
    /// Les exports nommés (liste de noms)
    pub named_exports: Vec<String>,
}
