use crate::ts_exports::TSExports;
use crate::src_file::SrcFile;
use crate::rule_result::{explain, is_index_file, RuleResult};

pub fn rule_single_named_export(ts_exports: &TSExports, src_file: &SrcFile) -> RuleResult {
    // Index files are handled by rule_star_export_index, which gives index-specific advice.
    if is_index_file(&src_file.path) || ts_exports.named_exports.len() <= 1 {
        return RuleResult::Ok;
    }

    let names = &ts_exports.named_exports;
    let files: Vec<String> = names.iter().map(|n| format!("{}.ts", n)).collect();
    RuleResult::Error(vec![explain(
        &format!(
            "This file has {} named exports ({}), but only one is allowed per file",
            names.len(),
            names.join(", ")
        ),
        &format!(
            "exportcase names each file after its single export, so `import {{ {0} }} from './{0}'` always tells you where {0} lives",
            names[0]
        ),
        &format!(
            "move each export into its own file ({}). To import them together, add an index.ts containing `export * from './{}';` and similar lines",
            files.join(", "),
            names[0]
        ),
    )])
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::ts_exports::TSExports;
    use crate::src_file::SrcFile;

    fn file(path: &str) -> SrcFile {
        SrcFile { path: path.to_string(), content: String::new() }
    }

    #[test]
    fn test_single_named_export_ok() {
        let mut ts_exports = TSExports::default();
        ts_exports.named_exports.push("Foo".to_string());
        let result = rule_single_named_export(&ts_exports, &file("foo.ts"));
        assert!(matches!(result, RuleResult::Ok));
    }

    #[test]
    fn test_multiple_named_exports_error() {
        let mut ts_exports = TSExports::default();
        ts_exports.named_exports.push("Foo".to_string());
        ts_exports.named_exports.push("Bar".to_string());
        let result = rule_single_named_export(&ts_exports, &file("foo.ts"));
        match result {
            RuleResult::Error(msgs) => {
                assert!(msgs[0].contains("Foo, Bar"));
                assert!(msgs[0].contains("Fix:"));
            }
            RuleResult::Ok => panic!("expected an error"),
        }
    }

    #[test]
    fn test_index_file_delegated_to_index_rule() {
        let mut ts_exports = TSExports::default();
        ts_exports.named_exports.push("Foo".to_string());
        ts_exports.named_exports.push("Bar".to_string());
        let result = rule_single_named_export(&ts_exports, &file("index.ts"));
        assert!(matches!(result, RuleResult::Ok));
    }
}
