use crate::ts_exports::TSExports;
use crate::src_file::SrcFile;
use crate::rule_result::{explain, is_index_file, RuleResult};
use std::path::Path;

pub fn rule_filename_matches_export(ts_exports: &TSExports, src_file: &SrcFile) -> RuleResult {
    // Index files are barrels, not named after an export: rule_star_export_index covers them.
    if is_index_file(&src_file.path) {
        return RuleResult::Ok;
    }

    let path = Path::new(&src_file.path);
    let filename = path.file_stem().map(|s| s.to_string_lossy()).unwrap_or_default();
    let extension = path.extension().map(|e| e.to_string_lossy()).unwrap_or_default();

    let matches_default = ts_exports.default_export.as_deref() == Some(filename.as_ref());
    let matches_named = ts_exports.named_exports.iter().any(|n| n == filename.as_ref());

    let export_name = match ts_exports.named_exports.first().or(ts_exports.default_export.as_ref()) {
        Some(name) => name,
        // No nameable export: nothing to compare against (star exports are reported elsewhere).
        None => return RuleResult::Ok,
    };

    if matches_default || matches_named {
        return RuleResult::Ok;
    }

    RuleResult::Error(vec![explain(
        &format!("Filename '{}' does not match its export '{}'", filename, export_name),
        &format!(
            "when the file is named after what it exports, you can find {0} without searching, and `import {{ {0} }} from './{0}'` reads consistently everywhere",
            export_name
        ),
        &format!(
            "rename {}.{} to {}.{} (`exportcase format` generates the rename commands for you)",
            filename, extension, export_name, extension
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
    fn test_filename_matches_named_export() {
        let mut ts_exports = TSExports::default();
        ts_exports.named_exports.push("foo".to_string());
        let result = rule_filename_matches_export(&ts_exports, &file("foo.ts"));
        assert!(matches!(result, RuleResult::Ok));
    }

    #[test]
    fn test_filename_matches_default_export() {
        let mut ts_exports = TSExports::default();
        ts_exports.default_export = Some("bar".to_string());
        let result = rule_filename_matches_export(&ts_exports, &file("bar.ts"));
        assert!(matches!(result, RuleResult::Ok));
    }

    #[test]
    fn test_filename_does_not_match_any_export() {
        let mut ts_exports = TSExports::default();
        ts_exports.named_exports.push("foo".to_string());
        let result = rule_filename_matches_export(&ts_exports, &file("bar.tsx"));
        match result {
            RuleResult::Error(msgs) => assert!(msgs[0].contains("rename bar.tsx to foo.tsx")),
            RuleResult::Ok => panic!("expected an error"),
        }
    }

    #[test]
    fn test_index_file_with_star_export() {
        let mut ts_exports = TSExports::default();
        ts_exports.has_star_export = true;
        let result = rule_filename_matches_export(&ts_exports, &file("index.ts"));
        assert!(matches!(result, RuleResult::Ok));
    }

    #[test]
    fn test_index_file_with_named_export_delegated() {
        let mut ts_exports = TSExports::default();
        ts_exports.named_exports.push("foo".to_string());
        let result = rule_filename_matches_export(&ts_exports, &file("index.ts"));
        assert!(matches!(result, RuleResult::Ok));
    }
}
