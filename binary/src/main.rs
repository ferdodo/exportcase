mod custom_command;
mod read_custom_command;
mod define_cli;
mod src_file;
mod iterate_src_files;
mod ts_exports;
mod read_ts_exports;
mod read_tsx_exports;
mod rule_single_named_export;
mod rule_result;
mod rule_star_export_index;
mod rule_filename_matches_export;
mod check;

use custom_command::CliCommand;
use read_custom_command::read_custom_command;
use define_cli::define_cli;
use std::process;
use check::check_command;

fn main() {
    let cli_command = define_cli();
    let args = read_custom_command(cli_command);
    
    match args.command {
        CliCommand::Check { directory } => {
            check_command(directory);
        },
        CliCommand::Help => {
            eprintln!("Usage: exportcase check <directory>");
            process::exit(1);
        }
    }
} 