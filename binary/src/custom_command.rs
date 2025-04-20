pub enum CliCommand {
    Check {
        directory: String,
    },
    Help,
}

pub struct CustomCommand {
    pub command: CliCommand,
} 