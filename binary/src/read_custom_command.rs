use clap::Command;
use crate::custom_command::{CliCommand, CustomCommand};

pub fn read_custom_command(cli_command: Command) -> CustomCommand {
    let matches = cli_command.get_matches();
    
    let (command, sub_matches) = matches.subcommand().expect("A subcommand is required");
    let directory = sub_matches.get_one::<String>("directory")
        .expect("Directory is required")
        .to_string();
    
    let command = match command {
        "check" => CliCommand::Check { directory },
        "format" => CliCommand::Format { directory },
        _ => unreachable!("Clap should have handled invalid commands"),
    };
    
    CustomCommand { command }
} 