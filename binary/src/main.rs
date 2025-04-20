mod custom_command;
mod read_custom_command;
mod define_cli;
mod src_file;
mod iterate_src_files;
mod ts_exports;
mod read_ts_exports;

use custom_command::{CliCommand};
use read_custom_command::read_custom_command;
use define_cli::define_cli;
use iterate_src_files::iterate_src_files;
use read_ts_exports::read_ts_exports;
use std::process;
use std::path::PathBuf;

fn main() {
    let cli_command = define_cli();
    let args = read_custom_command(cli_command);
    
    match args.command {
        CliCommand::Check { directory } => {
            let path = PathBuf::from(&directory);
            
            if !path.exists() {
                eprintln!("Error: Path '{}' does not exist", path.display());
                process::exit(1);
            }
            
            println!("Checking TypeScript files in: {}", path.display());
            
            let src_files = iterate_src_files(&directory);
            let mut file_count = 0;
            let mut error_count = 0;
            
            for file in src_files {
                file_count += 1;
                
                match read_ts_exports(&file) {
                    Ok(exports) => {
                        let mut file_has_error = false;
                        
                        if let Some(filename) = PathBuf::from(&file.path).file_stem() {
                            let filename_str = filename.to_string_lossy();
                            
                            let file_matches_export = 
                                exports.default_export.as_ref().map_or(false, |def| def == &filename_str) ||
                                exports.named_exports.contains(&filename_str.to_string());
                            
                            if !file_matches_export {
                                file_has_error = true;
                                error_count += 1;
                            }
                        }
                        
                        if file_has_error {
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
                            
                            if let Some(filename) = PathBuf::from(&file.path).file_stem() {
                                let filename_str = filename.to_string_lossy();
                                println!("  ❌ Filename '{}' does not match any export", filename_str);
                            }
                        }
                    },
                    Err(err) => {
                        println!("\nError in TypeScript file: {}", file.path);
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