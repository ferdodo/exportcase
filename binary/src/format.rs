use crate::{
    src_file::SrcFile,
    ts_exports::TSExports,
    rule_filename_matches_export::rule_filename_matches_export,
    rule_single_named_export::rule_single_named_export,
    rule_star_export_index::rule_star_export_index,
    rule_result::RuleResult,
    iterate_src_files::iterate_src_files,
    read_ts_exports::read_ts_exports,
    read_tsx_exports::read_tsx_exports,
};
use std::path::Path;

pub fn format_command(directory: String) {
    println!("#!/bin/bash\n");
    println!("# Script generated by exportcase to rename files according to their exports");
    println!("# Files that cannot be automatically renamed are listed below\n");
    
    let src_files = iterate_src_files(&directory);
    let mut skipped_files = Vec::new();
    let mut renamed_files = Vec::new();
    let mut correctly_named_count = 0;
    
    for file in src_files {
        let is_tsx = file.path.to_lowercase().ends_with(".tsx");
        
        let exports_result = if is_tsx {
            read_tsx_exports(&file)
        } else {
            read_ts_exports(&file)
        };
        
        match exports_result {
            Ok(exports) => {
                let rules = [
                    rule_single_named_export(&exports, &file),
                    rule_star_export_index(&exports, &file),
                ];
                
                let mut has_other_errors = false;
                for rule in &rules {
                    if let RuleResult::Error(_) = rule {
                        has_other_errors = true;
                        break;
                    }
                }
                
                if has_other_errors {
                    skipped_files.push(format!("{}: Has multiple exports or other issues", file.path));
                    continue;
                }
                
                if let RuleResult::Error(_) = rule_filename_matches_export(&exports, &file) {
                    if let Some(named_export) = exports.named_exports.first() {
                        let new_name = format!("{}.{}", named_export, if is_tsx { "tsx" } else { "ts" });
                        let new_path = Path::new(&file.path)
                            .with_file_name(&new_name)
                            .to_string_lossy()
                            .to_string();
                        
                        if !Path::new(&new_path).exists() {
                            println!("mv {} {}", file.path, new_path);
                            renamed_files.push(format!("{} -> {}", file.path, new_path));
                        } else {
                            skipped_files.push(format!("{}: Destination file already exists ({})", file.path, new_path));
                        }
                    } else {
                        skipped_files.push(format!("{}: No named exports found", file.path));
                    }
                } else {
                    correctly_named_count += 1;
                }
            },
            Err(err) => {
                skipped_files.push(format!("{}: Error analyzing exports: {}", file.path, err));
            }
        }
    }
    
    if !skipped_files.is_empty() {
        println!("\n# Files that could not be automatically renamed:");
        for file in &skipped_files {
            println!("# {}", file);
        }
    }
    
    println!("\n# Summary:");
    println!("# {} files will be renamed", renamed_files.len());
    println!("# {} files were skipped", skipped_files.len());
    println!("# {} files are already correctly named", correctly_named_count);
} 