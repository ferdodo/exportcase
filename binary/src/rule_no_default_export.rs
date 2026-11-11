use crate::ts_exports::TSExports;
use crate::src_file::SrcFile;
use crate::rule_result::{error, RuleResult, Suggestion};

/// Rewrites `export default X` as a named export on the same line, when the line allows it.
fn default_fix(line: &str, name: &str) -> String {
    if line.contains("export default function") || line.contains("export default class") {
        line.replacen("export default ", "export ", 1)
    } else {
        line.replacen(&format!("export default {}", name), &format!("export {{ {} }}", name), 1)
    }
}

pub fn rule_no_default_export(ts_exports: &TSExports, src_file: &SrcFile) -> RuleResult {
    if let Some(name) = &ts_exports.default_export {
        let pos = ts_exports.default_pos.unwrap_or_default();
        let line = src_file.content.lines().nth(pos.line - 1).unwrap_or("").trim_end().to_string();
        let after = default_fix(&line, name);
        let suggestion = (after != line).then(|| Suggestion::Replace { before: line, after });
        return error(
            "no-default-export",
            pos,
            format!("Default export '{}' is not allowed", name),
            "a default export can be imported under any name, so the same thing ends up called differently across the codebase and the filename can no longer be trusted",
            &format!("replace `export default {0}` with a named export: `export {{ {0} }}` or `export function {0}`", name),
            suggestion,
        );
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