pub enum CliCommand {
    Check {
        directory: Option<String>,
        files: Option<Vec<String>>,
    },
    Format {
        directory: Option<String>,
        files: Option<Vec<String>>,
    },
}

pub struct CustomCommand {
    pub command: CliCommand,
} 