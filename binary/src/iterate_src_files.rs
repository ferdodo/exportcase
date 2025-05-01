use std::path::Path;
use walkdir::WalkDir;
use crate::src_file::SrcFile;

pub fn iterate_src_files(directory: &str) -> impl Iterator<Item = SrcFile> {
    WalkDir::new(directory)
        .into_iter()
        .filter_map(Result::ok)
        .filter(|entry| {
            let path = entry.path();
            path.is_file() && is_typescript_file(path)
        })
        .map(|entry| {
            let path_str = entry.path().to_string_lossy().to_string();
            SrcFile { path: path_str }
        })
}

fn is_typescript_file(path: &Path) -> bool {
    if let Some(extension) = path.extension() {
        let ext = extension.to_string_lossy().to_lowercase();
        return ext == "ts" || ext == "tsx";
    }
    false
}
