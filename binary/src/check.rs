use crate::{
    read_ts_exports::read_ts_exports, render::{render, use_color},
    rule_filename_matches_export::rule_filename_matches_export,
    rule_no_default_export::rule_no_default_export,
    rule_result::{Diagnostic, RuleResult},
    rule_single_named_export::rule_single_named_export,
    rule_star_export_index::rule_star_export_index,
    src_file::SrcFile, wasi_src_file_repository::create_file_iterator,
};
use std::process;

/// Prints every diagnostic of one file and returns how many were found.
fn check_file(file: &SrcFile, color: bool) -> usize {
    let exports = match read_ts_exports(file) {
        Ok(exports) => exports,
        Err(err) => {
            println!("{}  error  {}\n", file.path, err);
            return 1;
        }
    };

    let rules = [
        rule_single_named_export(&exports, file),
        rule_star_export_index(&exports, file),
        rule_filename_matches_export(&exports, file),
        rule_no_default_export(&exports, file),
    ];
    let diagnostics: Vec<Diagnostic> = rules.into_iter()
        .flat_map(|rule| match rule {
            RuleResult::Error(diags) => diags,
            RuleResult::Ok => Vec::new(),
        })
        .collect();

    for d in &diagnostics {
        println!("{}", render(file, d, color));
    }
    diagnostics.len()
}

pub fn check_command(directory: Option<String>, files: Option<Vec<String>>) {
    let color = use_color();
    let mut file_count = 0;
    let mut files_with_errors = 0;
    let mut problem_count = 0;

    for file_result in create_file_iterator(directory, files) {
        match file_result {
            Ok(file) => {
                file_count += 1;
                let found = check_file(&file, color);
                if found > 0 {
                    files_with_errors += 1;
                    problem_count += found;
                }
            },
            Err(err) => {
                println!("error  {}\n", err);
                problem_count += 1;
            }
        }
    }

    if file_count == 0 && problem_count == 0 {
        println!("No TypeScript files found.");
        return;
    }

    if problem_count == 0 {
        println!("✅ {} files checked, no problems found", file_count);
    } else {
        println!(
            "❌ Found {} problems in {} files ({} checked)",
            problem_count, files_with_errors, file_count
        );
        process::exit(1);
    }
}
