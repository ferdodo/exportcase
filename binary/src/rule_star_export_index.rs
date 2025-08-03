use crate::ts_exports::TSExports;
use crate::src_file::SrcFile;
use crate::rule_result::RuleResult;
use std::path::Path;

pub fn rule_star_export_index(ts_exports: &TSExports, src_file: &SrcFile) -> RuleResult {
    let filename = Path::new(&src_file.path)
        .file_stem()
        .map(|s| s.to_string_lossy())
        .unwrap_or_default();
    
    // Check if this is an index file
    if filename == "index" {
        // Index files should only contain star exports, no named exports
        if ts_exports.has_star_export && (ts_exports.named_exports.len() > 0 || ts_exports.default_export.is_some()) {
            return RuleResult::Error(vec![
                "Index files should only contain star exports, not named or default exports".to_string()
            ]);
        }
    } else {
        // Non-index files should not contain star exports
        if ts_exports.has_star_export {
            return RuleResult::Error(vec![
                "Star export (export * from) is only allowed in index files".to_string()
            ]);
        }
    }
    
    RuleResult::Ok
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::ts_exports::TSExports;
    use crate::src_file::SrcFile;

    #[test]
    fn test_star_export_in_index_file_ok() {
        let mut ts_exports = TSExports::default();
        ts_exports.has_star_export = true;
        let src_file = SrcFile { 
            path: "index.ts".to_string(),
            content: String::new()
        };
        let result = rule_star_export_index(&ts_exports, &src_file);
        assert!(matches!(result, RuleResult::Ok));
    }

    #[test]
    fn test_star_export_with_named_exports_in_index_file_error() {
        let mut ts_exports = TSExports::default();
        ts_exports.has_star_export = true;
        ts_exports.named_exports.push("someFunction".to_string());
        let src_file = SrcFile { 
            path: "index.ts".to_string(),
            content: String::new()
        };
        let result = rule_star_export_index(&ts_exports, &src_file);
        assert!(matches!(result, RuleResult::Error(_)));
    }

    #[test]
    fn test_star_export_in_non_index_file_error() {
        let mut ts_exports = TSExports::default();
        ts_exports.has_star_export = true;
        let src_file = SrcFile { 
            path: "foo.ts".to_string(),
            content: String::new()
        };
        let result = rule_star_export_index(&ts_exports, &src_file);
        assert!(matches!(result, RuleResult::Error(_)));
    }

    #[test]
    fn test_no_star_export_ok() {
        let ts_exports = TSExports::default();
        let src_file = SrcFile { 
            path: "foo.ts".to_string(),
            content: String::new()
        };
        let result = rule_star_export_index(&ts_exports, &src_file);
        assert!(matches!(result, RuleResult::Ok));
    }
} 