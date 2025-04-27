#[derive(Debug, Default)]
pub struct TSExports {
    /// L'export par défaut, s'il existe
    pub default_export: Option<String>,
    
    /// Les exports nommés (liste de noms)
    pub named_exports: Vec<String>,
    
    /// Indique s'il y a un "export * from '...'"
    pub has_star_export: bool,
    
    /// Stocke les sources des réexportations
    pub reexport_sources: Vec<String>,
}

impl TSExports {
    pub fn new() -> Self {
        TSExports {
            default_export: None,
            named_exports: Vec::new(),
            has_star_export: false,
            reexport_sources: Vec::new(),
        }
    }
    
    // Ajouter d'autres méthodes utiles...
}
