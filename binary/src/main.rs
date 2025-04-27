mod custom_command;
mod read_custom_command;
mod define_cli;
mod src_file;
mod iterate_src_files;
mod ts_exports;
mod read_ts_exports;
mod transpile_tsx;

use custom_command::{CliCommand};
use read_custom_command::read_custom_command;
use define_cli::define_cli;
use iterate_src_files::iterate_src_files;
use read_ts_exports::read_ts_exports;
use transpile_tsx::{transpile_tsx_to_ts, TempFileCleaner};
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
            let mut temp_cleaner = TempFileCleaner::new();
            
            for file in src_files {
                file_count += 1;
                
                let is_tsx = PathBuf::from(&file.path)
                    .extension()
                    .map_or(false, |ext| ext.to_string_lossy().to_lowercase() == "tsx");
                
                if is_tsx {
                    match transpile_tsx_to_ts(&file) {
                        Ok(transpiled_file) => {
                            temp_cleaner.add(&transpiled_file);
                            
                            // Process le fichier transpilé
                            match read_ts_exports(&transpiled_file) {
                                Ok(exports) => {
                                    let mut file_has_error = false;
                                    let mut error_messages: Vec<String> = Vec::new();
                                    
                                    // Vérifier si le fichier contient plusieurs exports
                                    let has_multiple_exports = exports.default_export.is_some() && !exports.named_exports.is_empty() ||
                                                              exports.named_exports.len() > 1;
                                    
                                    if has_multiple_exports {
                                        file_has_error = true;
                                        error_messages.push("Multiple exports are not allowed - ambiguous for filename matching".to_string());
                                    }
                                    
                                    // Vérification du nom de fichier correspondant à un export
                                    if let Some(filename) = PathBuf::from(&file.path).file_stem() {
                                        let filename_str = filename.to_string_lossy();
                                        
                                        let has_no_exports = exports.default_export.is_none() && 
                                                             exports.named_exports.is_empty() && 
                                                             !exports.has_star_export;
                                        
                                        let mut file_matches_export = 
                                            has_no_exports ||
                                            exports.default_export.as_ref().map_or(false, |def| def == &filename_str) ||
                                            exports.named_exports.contains(&filename_str.to_string());
                                        
                                        // Vérification si le fichier contient un export * et n'est pas un fichier index
                                        if exports.has_star_export {
                                            let is_index_file = filename_str == "index";
                                            
                                            if !is_index_file {
                                                file_has_error = true;
                                                error_messages.push("Star export (export * from) is only allowed in index files".to_string());
                                            } else {
                                                // Les fichiers index avec "export * from" sont OK
                                                file_matches_export = true;
                                            }
                                        }
                                        
                                        if !file_matches_export {
                                            file_has_error = true;
                                            let error_msg = format!("Filename '{}' does not match any export", filename_str);
                                            error_messages.push(error_msg);
                                        }
                                    }
                                    
                                    if file_has_error {
                                        error_count += 1;
                                        println!("\nFound TypeScript file with error: {}", file.path);
                                        
                                        // Afficher d'abord les informations d'export pour contexte
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
                                        
                                        println!("  Errors:");
                                        for error_msg in &error_messages {
                                            println!("    ❌ {}", error_msg);
                                        }
                                    }
                                },
                                Err(err) => {
                                    println!("\nError in TypeScript file: {}", file.path);
                                    println!("  Error analyzing exports: {}", err);
                                    error_count += 1;
                                }
                            }
                        },
                        Err(err) => {
                            println!("\nError transpiling TSX file: {}", file.path);
                            println!("  Detail: {}", err);
                            error_count += 1;
                        }
                    }
                } else {
                    // Traitement des fichiers TS
                    match read_ts_exports(&file) {
                        Ok(exports) => {
                            let mut file_has_error = false;
                            let mut error_messages: Vec<String> = Vec::new();
                            
                            // Vérifier si le fichier contient plusieurs exports
                            let has_multiple_exports = exports.default_export.is_some() && !exports.named_exports.is_empty() ||
                                                      exports.named_exports.len() > 1;
                            
                            if has_multiple_exports {
                                file_has_error = true;
                                error_messages.push("Multiple exports are not allowed - ambiguous for filename matching".to_string());
                            }
                            
                            // Vérification du nom de fichier correspondant à un export
                            if let Some(filename) = PathBuf::from(&file.path).file_stem() {
                                let filename_str = filename.to_string_lossy();
                                
                                let has_no_exports = exports.default_export.is_none() && 
                                                     exports.named_exports.is_empty() && 
                                                     !exports.has_star_export;
                                
                                let mut file_matches_export = 
                                    has_no_exports ||
                                    exports.default_export.as_ref().map_or(false, |def| def == &filename_str) ||
                                    exports.named_exports.contains(&filename_str.to_string());
                                
                                // Vérification si le fichier contient un export * et n'est pas un fichier index
                                if exports.has_star_export {
                                    let is_index_file = filename_str == "index";
                                    
                                    if !is_index_file {
                                        file_has_error = true;
                                        error_messages.push("Star export (export * from) is only allowed in index files".to_string());
                                    } else {
                                        // Les fichiers index avec "export * from" sont OK
                                        file_matches_export = true;
                                    }
                                }
                                
                                if !file_matches_export {
                                    file_has_error = true;
                                    let error_msg = format!("Filename '{}' does not match any export", filename_str);
                                    error_messages.push(error_msg);
                                }
                            }
                            
                            if file_has_error {
                                error_count += 1;
                                println!("\nFound TypeScript file with error: {}", file.path);
                                
                                // Afficher d'abord les informations d'export pour contexte
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
                                
                                // Vous pourriez aussi vouloir afficher des informations sur les réexportations
                                if !exports.reexport_sources.is_empty() {
                                    println!("  Re-exports from:");
                                    for source in &exports.reexport_sources {
                                        println!("    - {}", source);
                                    }
                                }
                                
                                // Si le fichier a un export "*", mentionnez-le
                                if exports.has_star_export {
                                    println!("  Has star export (export * from '...')");
                                }
                                
                                println!("  Errors:");
                                for error_msg in &error_messages {
                                    println!("    ❌ {}", error_msg);
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
            }
            
            temp_cleaner.cleanup();
            
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