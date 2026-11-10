use crate::ts_exports::TSExports;
use crate::src_file::SrcFile;
use crate::rule_result::{explain, is_index_file, RuleResult};

const INDEX_WHY: &str = "every other file exports exactly one name matching its filename, so `export * from './A'` already exposes exactly `A`. Listing names again in index.ts duplicates them, goes stale when files are renamed, and cannot be checked against filenames";

pub fn rule_star_export_index(ts_exports: &TSExports, src_file: &SrcFile) -> RuleResult {
    if is_index_file(&src_file.path) {
        let mut names = ts_exports.named_exports.clone();
        if let Some(default) = &ts_exports.default_export {
            names.push(format!("default {}", default));
        }
        if names.is_empty() {
            return RuleResult::Ok;
        }

        let fix = if ts_exports.reexport_sources.is_empty() {
            let example = ts_exports.named_exports.first()
                .or(ts_exports.default_export.as_ref())
                .cloned()
                .unwrap_or_default();
            format!(
                "move each export into its own file named after it (e.g. {0}.ts), then re-export it here with `export * from './{0}';`",
                example
            )
        } else {
            let lines: Vec<String> = ts_exports.reexport_sources.iter()
                .map(|src| format!("`export * from '{}';`", src))
                .collect();
            format!("replace the named re-exports with {}", lines.join(" "))
        };

        return RuleResult::Error(vec![explain(
            &format!(
                "index files may only contain `export * from '...'` lines, but this one exports {}",
                names.join(", ")
            ),
            INDEX_WHY,
            &fix,
        )]);
    }

    if ts_exports.has_star_export {
        return RuleResult::Error(vec![explain(
            "`export * from '...'` is only allowed in index.ts files",
            "a star export hides which name a file provides, so exportcase cannot check that the filename matches it. index.ts is the one place meant for grouping",
            "move this re-export into the folder's index.ts, or export a single value from this file directly",
        )]);
    }

    RuleResult::Ok
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
    fn test_star_export_in_index_file_ok() {
        let mut ts_exports = TSExports::default();
        ts_exports.has_star_export = true;
        let result = rule_star_export_index(&ts_exports, &file("index.ts"));
        assert!(matches!(result, RuleResult::Ok));
    }

    #[test]
    fn test_star_export_with_named_exports_in_index_file_error() {
        let mut ts_exports = TSExports::default();
        ts_exports.has_star_export = true;
        ts_exports.named_exports.push("someFunction".to_string());
        let result = rule_star_export_index(&ts_exports, &file("index.ts"));
        assert!(matches!(result, RuleResult::Error(_)));
    }

    #[test]
    fn test_named_reexports_in_index_suggest_star_export() {
        let mut ts_exports = TSExports::default();
        ts_exports.named_exports.push("A".to_string());
        ts_exports.reexport_sources.push("./A".to_string());
        let result = rule_star_export_index(&ts_exports, &file("index.ts"));
        match result {
            RuleResult::Error(msgs) => assert!(msgs[0].contains("`export * from './A';`")),
            RuleResult::Ok => panic!("expected an error"),
        }
    }

    #[test]
    fn test_star_export_in_non_index_file_error() {
        let mut ts_exports = TSExports::default();
        ts_exports.has_star_export = true;
        let result = rule_star_export_index(&ts_exports, &file("foo.ts"));
        assert!(matches!(result, RuleResult::Error(_)));
    }

    #[test]
    fn test_no_star_export_ok() {
        let ts_exports = TSExports::default();
        let result = rule_star_export_index(&ts_exports, &file("foo.ts"));
        assert!(matches!(result, RuleResult::Ok));
    }
}
