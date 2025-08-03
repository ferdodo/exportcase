use crate::ts_exports::TSExports;
use crate::src_file::SrcFile;
use crate::rule_result::RuleResult;

pub fn rule_no_default_export(ts_exports: &TSExports, _src_file: &SrcFile) -> RuleResult {
    if ts_exports.default_export.is_some() {
        return RuleResult::Error(vec![
            "Default exports are not allowed".to_string()
        ]);
    }
    RuleResult::Ok
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::ts_exports::TSExports;
    use crate::src_file::SrcFile;

    #[test]
    fn test_no_default_export_ok() {
        let ts_exports = TSExports::default();
        let src_file = SrcFile { 
            path: "foo.ts".to_string(),
            content: String::new()
        };
        let result = rule_no_default_export(&ts_exports, &src_file);
        assert!(matches!(result, RuleResult::Ok));
    }

    #[test]
    fn test_default_export_error() {
        let mut ts_exports = TSExports::default();
        ts_exports.default_export = Some("MyComponent".to_string());
        let src_file = SrcFile { 
            path: "foo.ts".to_string(),
            content: String::new()
        };
        let result = rule_no_default_export(&ts_exports, &src_file);
        assert!(matches!(result, RuleResult::Error(_)));
    }

    #[test]
    fn test_named_exports_ok() {
        let mut ts_exports = TSExports::default();
        ts_exports.named_exports = vec!["MyComponent".to_string(), "MyOtherComponent".to_string()];
        let src_file = SrcFile { 
            path: "foo.ts".to_string(),
            content: String::new()
        };
        let result = rule_no_default_export(&ts_exports, &src_file);
        assert!(matches!(result, RuleResult::Ok));
    }
} 