use crate::{
    read_ts_exports, rule_single_named_export, rule_result, rule_star_export_index,
    rule_filename_matches_export, rule_no_default_export, wasi_src_file_repository::create_file_iterator,
    src_file::SrcFile, ts_exports::TSExports
};
use read_ts_exports::read_ts_exports;
use rule_single_named_export::rule_single_named_export;
use rule_star_export_index::rule_star_export_index;
use rule_filename_matches_export::rule_filename_matches_export;
use rule_no_default_export::rule_no_default_export;
use std::process;

fn print_export_info(exports: &TSExports) {
    if let Some(default_export) = &exports.default_export {
        println!("  Default export: {}", default_export);
    } else {
        println!("  No default export");
    }
    
    if !exports.named_exports.is_empty() {
        println!("  Named exports:");
        for export in &exports.named_exports { println!("    - {}", export); }
    } else {
        println!("  No named exports");
    }
    
    if !exports.reexport_sources.is_empty() {
        println!("  Re-exports from:");
        for source in &exports.reexport_sources { println!("    - {}", source); }
    }
    
    if exports.has_star_export {
        println!("  Has star export (export * from)");
    }
}

fn check_file_exports(file: &SrcFile) -> bool {
    let exports_result = read_ts_exports(file);
    
    match exports_result {
        Ok(exports) => {
            let rules = [
                rule_single_named_export(&exports, file),
                rule_star_export_index(&exports, file),
                rule_filename_matches_export(&exports, file),
                rule_no_default_export(&exports, file),
            ];
            
            let mut file_has_error = false;
            let mut error_messages: Vec<String> = Vec::new();
            for rule in &rules {
                if let rule_result::RuleResult::Error(msgs) = rule {
                    file_has_error = true;
                    error_messages.extend(msgs.clone());
                }
            }
            
            if file_has_error {
                println!("\nFound TypeScript file with error: {}", file.path);
                print_export_info(&exports);
                println!("  Errors:");
                for error_msg in &error_messages { println!("    ❌ {}", error_msg); }
            }
            
            file_has_error
        },
        Err(err) => {
            println!("\nError in file: {}", file.path);
            println!("  Error analyzing exports: {}", err);
            true
        }
    }
}

pub fn check_command(directory: Option<String>, files: Option<Vec<String>>) {
    let src_files = create_file_iterator(directory, files);
    let mut file_count = 0;
    let mut error_count = 0;
    
    for file_result in src_files {
        match file_result {
            Ok(file) => {
                file_count += 1;
                if check_file_exports(&file) { error_count += 1; }
            },
            Err(err) => {
                println!("\nError loading file: {}", err);
                error_count += 1;
            }
        }
    }
    
    if file_count == 0 {
        println!("No TypeScript files found.");
    } else {
        println!("\nTotal TypeScript files checked: {}", file_count);
        if error_count > 0 {
            println!("❌ Found {} files with naming convention errors", error_count);
            process::exit(1);
        } else {
            println!("✅ All files follow the naming convention");
        }
    }
}