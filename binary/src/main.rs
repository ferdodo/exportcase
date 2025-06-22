mod custom_command;
mod read_custom_command;
mod define_cli;
mod check;
mod format;
mod src_file;
mod iterate_src_files;
mod ts_exports;
mod read_ts_exports;
mod read_tsx_exports;
mod rule_single_named_export;
mod rule_star_export_index;
mod rule_filename_matches_export;
mod rule_result;
mod ts_parser;

use crate::custom_command::CliCommand;
use crate::read_custom_command::read_custom_command;
use crate::define_cli::define_cli;
use crate::check::check_command;
use crate::format::format_command;

fn main() {
    let cli_command = define_cli();
    let args = read_custom_command(cli_command);
    
    match args.command {
        CliCommand::Check { directory } => {
            check_command(directory);
        },
        CliCommand::Format { directory } => {
            format_command(directory);
        }
    }
} 