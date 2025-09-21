use clap::Command;
use crate::custom_command::{CliCommand, CustomCommand};
use std::path::Path;

pub fn read_custom_command(cli_command: Command) -> CustomCommand {
    let matches = cli_command.get_matches();
    
    let (command, sub_matches) = matches.subcommand().expect("A subcommand is required");
    
    let path = sub_matches.get_one::<String>("path").map(|s| s.to_string());
    let files = sub_matches.get_many::<String>("files").map(|values| values.map(|s| s.to_string()).collect());
    
    // Determine if path is a file or directory
    let (directory, specific_files) = match (path, files) {
        (Some(path_str), None) => {
            let path = Path::new(&path_str);
            if path.is_file() {
                (None, Some(vec![path_str]))
            } else {
                (Some(path_str), None)
            }
        },
        (Some(path_str), Some(file_list)) => {
            let path = Path::new(&path_str);
            if path.is_file() {
                let mut all_files = vec![path_str];
                all_files.extend(file_list);
                (None, Some(all_files))
            } else {
                (Some(path_str), Some(file_list))
            }
        },
        (None, Some(file_list)) => (None, Some(file_list)),
        (None, None) => (None, None),
    };
    
    let command = match command {
        "check" => CliCommand::Check { directory, files: specific_files },
        "format" => CliCommand::Format { directory, files: specific_files },
        _ => unreachable!("Clap should have handled invalid commands"),
    };
    
    CustomCommand { command }
} 