use crate::ts_exports::TSExports;
use crate::src_file::SrcFile;
use crate::rule_result::RuleResult;
use std::path::Path;

pub fn rule_filename_matches_export(ts_exports: &TSExports, src_file: &SrcFile) -> RuleResult {
    let filename = Path::new(&src_file.path)
        .file_stem()
        .map(|s| s.to_string_lossy())
        .unwrap_or_default();

    let has_no_exports = ts_exports.default_export.is_none()
        && ts_exports.named_exports.is_empty()
        && !ts_exports.has_star_export;

    let matches_default = ts_exports.default_export.as_ref().map_or(false, |def| def == &filename);
    let matches_named = ts_exports.named_exports.contains(&filename.to_string());

    let mut file_matches_export = has_no_exports || matches_default || matches_named;

    if ts_exports.has_star_export {
        let is_index_file = filename == "index";
        if is_index_file {
            file_matches_export = true;
        }
    }

    if !file_matches_export {
        RuleResult::Error(vec![
            format!("Filename '{}' does not match any export", filename)
        ])
    } else {
        RuleResult::Ok
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::ts_exports::TSExports;
    use crate::src_file::SrcFile;

    #[test]
    fn test_filename_matches_named_export() {
        let mut ts_exports = TSExports::new();
        ts_exports.named_exports.push("foo".to_string());
        let src_file = SrcFile { 
            path: "foo.ts".to_string(),
            content: String::new()
        };
        let result = rule_filename_matches_export(&ts_exports, &src_file);
        assert!(matches!(result, RuleResult::Ok));
    }

    #[test]
    fn test_filename_matches_default_export() {
        let mut ts_exports = TSExports::new();
        ts_exports.default_export = Some("bar".to_string());
        let src_file = SrcFile { 
            path: "bar.ts".to_string(),
            content: String::new()
        };
        let result = rule_filename_matches_export(&ts_exports, &src_file);
        assert!(matches!(result, RuleResult::Ok));
    }

    #[test]
    fn test_filename_does_not_match_any_export() {
        let mut ts_exports = TSExports::new();
        ts_exports.named_exports.push("foo".to_string());
        let src_file = SrcFile { 
            path: "bar.ts".to_string(),
            content: String::new()
        };
        let result = rule_filename_matches_export(&ts_exports, &src_file);
        assert!(matches!(result, RuleResult::Error(_)));
    }

    #[test]
    fn test_index_file_with_star_export() {
        let mut ts_exports = TSExports::new();
        ts_exports.has_star_export = true;
        let src_file = SrcFile { 
            path: "index.ts".to_string(),
            content: String::new()
        };
        let result = rule_filename_matches_export(&ts_exports, &src_file);
        assert!(matches!(result, RuleResult::Ok));
    }
} 