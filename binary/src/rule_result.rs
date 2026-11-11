use crate::ts_exports::Position;

/// A concrete fix shown under the diagnostic: a line replacement or a file move.
pub enum Suggestion {
    Replace { before: String, after: String },
    Move { from: String, to: String },
}

/// One rule violation, located at a line and column of a file.
pub struct Diagnostic {
    pub rule: &'static str,
    pub pos: Position,
    pub problem: String,
    pub why: String,
    pub fix: String,
    pub suggestion: Option<Suggestion>,
}

pub enum RuleResult {
    Ok,
    Error(Vec<Diagnostic>),
}

pub fn error(
    rule: &'static str,
    pos: Position,
    problem: String,
    why: &str,
    fix: &str,
    suggestion: Option<Suggestion>,
) -> RuleResult {
    RuleResult::Error(vec![Diagnostic {
        rule,
        pos,
        problem,
        why: why.to_string(),
        fix: fix.to_string(),
        suggestion,
    }])
}

pub fn is_index_file(path: &str) -> bool {
    std::path::Path::new(path)
        .file_stem()
        .map_or(false, |stem| stem == "index")
}
