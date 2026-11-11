use crate::rule_result::{Diagnostic, Suggestion};
use crate::src_file::SrcFile;
use std::io::IsTerminal;

const BLUE: &str = "\x1b[34m";
const RED: &str = "\x1b[31m";
const GREEN: &str = "\x1b[32m";
const CYAN: &str = "\x1b[36m";
const DIM: &str = "\x1b[2m";
const RESET: &str = "\x1b[0m";

/// Colors are used only when printing to a terminal, and never when NO_COLOR is set.
pub fn use_color() -> bool {
    std::io::stdout().is_terminal() && std::env::var_os("NO_COLOR").is_none()
}

fn paint(color: bool, code: &str, text: &str) -> String {
    if color { format!("{}{}{}", code, text, RESET) } else { text.to_string() }
}

/// Renders one diagnostic: location, error, code frame, why/fix, then the suggested fix.
/// Each part is separated from the next by a blank line.
pub fn render(file: &SrcFile, d: &Diagnostic, color: bool) -> String {
    let lines: Vec<&str> = file.content.lines().collect();
    let idx = d.pos.line - 1;
    let source_line = lines.get(idx).copied().unwrap_or("").trim_end();
    let width = d.pos.line.to_string().len();
    let gutter = " ".repeat(width);

    let mut out = format!(
        "{}:{}:{}  {}\n\n",
        paint(color, CYAN, &file.path),
        d.pos.line,
        d.pos.col,
        paint(color, DIM, d.rule),
    );
    out += &format!("  {} {}\n\n", paint(color, RED, "⚠"), paint(color, RED, &d.problem));

    if idx > 0 {
        if let Some(prev) = lines.get(idx - 1) {
            out += &format!("    {:>width$} │ {}\n", idx, prev.trim_end(), width = width);
        }
    }
    out += &format!("  > {:>width$} │ {}\n", d.pos.line, source_line, width = width);

    // Keep tabs so the caret lines up with the code above it.
    let pad: String = source_line.chars().take(d.pos.col - 1)
        .map(|c| if c == '\t' { '\t' } else { ' ' })
        .collect();
    let caret_len = source_line.chars().count().saturating_sub(d.pos.col - 1).max(1);
    out += &format!("    {} │ {}{}\n\n", gutter, pad, paint(color, RED, &"^".repeat(caret_len)));

    out += &format!("  {} {}\n\n", paint(color, BLUE, "ℹ Why:"), paint(color, BLUE, &d.why));
    out += &format!("  {} {}\n", paint(color, BLUE, "ℹ Fix:"), paint(color, BLUE, &d.fix));

    match &d.suggestion {
        Some(Suggestion::Replace { before, after }) => {
            out += "\n";
            out += &format!("    {:>width$} │ {}\n", d.pos.line, paint(color, RED, &format!("- {}", before)), width = width);
            out += &format!("    {:>width$} │ {}\n", d.pos.line, paint(color, GREEN, &format!("+ {}", after)), width = width);
        }
        Some(Suggestion::Move { from, to }) => {
            out += "\n";
            out += &format!("    {}\n", paint(color, GREEN, &format!("$ mv {} {}", from, to)));
        }
        None => {}
    }
    out + "\n"
}
