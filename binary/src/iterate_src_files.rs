use std::path::Path;
use walkdir::WalkDir;
use crate::src_file::SrcFile;
use crate::src_file_repository::SrcFileRepository;

pub fn iterate_src_files<T: SrcFileRepository>(directory: &str, repository: &T) -> Vec<Result<SrcFile, std::io::Error>> {
    WalkDir::new(directory)
        .into_iter()
        .filter_map(Result::ok)
        .filter(|entry| {
            let path = entry.path();
            path.is_file() && is_typescript_file(path)
        })
        .map(|entry| {
            let path_str = entry.path().to_string_lossy().to_string();
            repository.load_src_file(&path_str)
        })
        .collect()
}

fn is_typescript_file(path: &Path) -> bool {
    if let Some(extension) = path.extension() {
        let ext = extension.to_string_lossy().to_lowercase();
        return ext == "ts" || ext == "tsx";
    }
    false
}
