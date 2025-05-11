use clap::{Command, Arg};

pub fn define_cli() -> Command {
    Command::new("exportcase")
        .about("A TypeScript validator that ensures file names match their exported name")
        .version(env!("CARGO_PKG_VERSION"))
        .subcommand(
            Command::new("check")
                .about("Check TypeScript files in the specified directory")
                .arg(
                    Arg::new("directory")
                        .help("Directory containing TypeScript files to validate")
                        .required(true)
                        .index(1)
                )
        )
        .subcommand(
            Command::new("format")
                .about("Generate a bash script to rename files according to their exports")
                .arg(
                    Arg::new("directory")
                        .help("Directory containing TypeScript files to format")
                        .required(true)
                        .index(1)
                )
        )
        .arg_required_else_help(true)
} 