pub enum CliCommand {
    Check {
        directory: String,
    },
    Format {
        directory: String,
    },
}

pub struct CustomCommand {
    pub command: CliCommand,
} 