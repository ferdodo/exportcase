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

use custom_command::{CliCommand};
use read_custom_command::read_custom_command;
use define_cli::define_cli;
use iterate_src_files::iterate_src_files;
use read_ts_exports::read_ts_exports;
use read_tsx_exports::read_tsx_exports;
use rule_single_named_export::rule_single_named_export;
use rule_star_export_index::rule_star_export_index;
use rule_filename_matches_export::rule_filename_matches_export;
use std::process;

fn main() {
    let cli_command = define_cli();
    let args = read_custom_command(cli_command);
    
    match args.command {
        CliCommand::Check { directory } => {
            println!("Checking TypeScript files in: {}", &directory);
            
            let src_files = iterate_src_files(&directory);
            let mut file_count = 0;
            let mut error_count = 0;
            
            for file in src_files {
                file_count += 1;
                
                let is_tsx = file.path.to_lowercase().ends_with(".tsx");
                
                let exports_result = if is_tsx {
                    read_tsx_exports(&file)
                } else {
                    read_ts_exports(&file)
                };
                
                match exports_result {
                    Ok(exports) => {
                        let mut file_has_error = false;
                        let mut error_messages: Vec<String> = Vec::new();
                        
                        let rules = [
                            rule_single_named_export(&exports, &file),
                            rule_star_export_index(&exports, &file),
                            rule_filename_matches_export(&exports, &file),
                        ];
                        
                        for rule in &rules {
                            if let crate::rule_result::RuleResult::Error(msgs) = rule {
                                file_has_error = true;
                                error_messages.extend(msgs.clone());
                            }
                        }
                        
                        if file_has_error {
                            error_count += 1;
                            println!("\nFound TypeScript file with error: {}", file.path);
                            
                            if let Some(default_export) = &exports.default_export {
                                println!("  Default export: {}", default_export);
                            } else {
                                println!("  No default export");
                            }
                            
                            if !exports.named_exports.is_empty() {
                                println!("  Named exports:");
                                for export in &exports.named_exports {
                                    println!("    - {}", export);
                                }
                            } else {
                                println!("  No named exports");
                            }
                            
                            if !exports.reexport_sources.is_empty() {
                                println!("  Re-exports from:");
                                for source in &exports.reexport_sources {
                                    println!("    - {}", source);
                                }
                            }
                            
                            if exports.has_star_export {
                                println!("  Has star export (export * from)");
                            }
                            
                            println!("  Errors:");
                            for error_msg in &error_messages {
                                println!("    ❌ {}", error_msg);
                            }
                        }
                    },
                    Err(err) => {
                        println!("\nError in {} file: {}", if is_tsx { "TSX" } else { "TypeScript" }, file.path);
                        println!("  Error analyzing exports: {}", err);
                        error_count += 1;
                    }
                }
            }
            
            if file_count == 0 {
                println!("No TypeScript files found in the directory.");
            } else {
                println!("\nTotal TypeScript files found: {}", file_count);
                if error_count > 0 {
                    println!("❌ Found {} files with naming convention errors", error_count);
                    process::exit(1);
                } else {
                    println!("✅ All files follow the naming convention");
                }
            }
        },
        CliCommand::Help => {
            eprintln!("Usage: exportcase check <directory>");
            process::exit(1);
        }
    }
} 