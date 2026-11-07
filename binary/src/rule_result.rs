pub enum RuleResult {
    Ok,
    Error(Vec<String>),
}

/// Builds a three-part error message: what is wrong, why the rule exists, how to fix it.
/// Continuation lines are indented to align with the text printed after "❌ ".
pub fn explain(problem: &str, why: &str, fix: &str) -> String {
    format!("{}\n       Why: {}\n       Fix: {}", problem, why, fix)
}

pub fn is_index_file(path: &str) -> bool {
    std::path::Path::new(path)
        .file_stem()
        .map_or(false, |stem| stem == "index")
}
