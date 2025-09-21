use clap::{Command, Arg};

pub fn define_cli() -> Command {
    Command::new("exportcase")
        .about("A TypeScript validator that ensures file names match their exported name")
        .version(env!("CARGO_PKG_VERSION"))
        .subcommand(
            Command::new("check")
                .about("Check TypeScript files in the specified directory or specific files")
                .arg(
                    Arg::new("path")
                        .help("Directory or file to validate")
                        .required_unless_present("files")
                )
                .arg(
                    Arg::new("files")
                        .long("files")
                        .help("Specific TypeScript files to validate")
                        .required(false)
                        .num_args(1..)
                        .value_delimiter(',')
                        .value_name("FILE")
                )
        )
        .subcommand(
            Command::new("format")
                .about("Generate a bash script to rename files according to their exports")
                .arg(
                    Arg::new("path")
                        .help("Directory or file to format")
                        .required_unless_present("files")
                )
                .arg(
                    Arg::new("files")
                        .long("files")
                        .help("Specific TypeScript files to format")
                        .required(false)
                        .num_args(1..)
                        .value_delimiter(',')
                        .value_name("FILE")
                )
        )
        .arg_required_else_help(true)
} 