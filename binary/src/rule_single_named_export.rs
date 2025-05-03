use crate::ts_exports::TSExports;
use crate::src_file::SrcFile;
use crate::rule_result::RuleResult;

pub fn rule_single_named_export(ts_exports: &TSExports, _src_file: &SrcFile) -> RuleResult {
    if ts_exports.named_exports.len() > 1 {
        RuleResult::Error(vec![
            "Multiple named exports are not allowed in a single file".to_string()
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
    fn test_single_named_export_ok() {
        let mut ts_exports = TSExports::new();
        ts_exports.named_exports.push("Foo".to_string());
        let src_file = SrcFile { path: "foo.ts".to_string() };
        let result = rule_single_named_export(&ts_exports, &src_file);
        assert!(matches!(result, RuleResult::Ok));
    }

    #[test]
    fn test_multiple_named_exports_error() {
        let mut ts_exports = TSExports::new();
        ts_exports.named_exports.push("Foo".to_string());
        ts_exports.named_exports.push("Bar".to_string());
        let src_file = SrcFile { path: "foo.ts".to_string() };
        let result = rule_single_named_export(&ts_exports, &src_file);
        assert!(matches!(result, RuleResult::Error(_)));
    }
} 