use crate::custom_command::{CustomCommand, CliCommand};
use clap::Command;

pub fn read_custom_command(command: Command) -> CustomCommand {
    let matches = command.get_matches();
    
    if let Some(check_matches) = matches.subcommand_matches("check") {
        if let Some(directory) = check_matches.get_one::<String>("directory") {
            return CustomCommand {
                command: CliCommand::Check {
                    directory: directory.clone(),
                },
            };
        }
    }
    
    CustomCommand {
        command: CliCommand::Help,
    }
} 