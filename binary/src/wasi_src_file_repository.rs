use std::fs;
use std::io;
use std::path::Path;
use walkdir::WalkDir;
use crate::src_file::SrcFile;
use crate::src_file_repository::SrcFileRepository;

pub struct WasiSrcFileRepository;

impl SrcFileRepository for WasiSrcFileRepository {
    fn load_src_file(&self, path: &str) -> io::Result<SrcFile> {
        let content = fs::read_to_string(path)?;
        Ok(SrcFile { 
            path: path.to_string(), 
            content 
        })
    }

    fn iterate_src_files(&self, directory: &str) -> Vec<io::Result<SrcFile>> {
        println!("Explore dir: {}", directory);
        let base = Path::new("/sandbox");
        let joined = base.join(directory);
        let dir_to_explore = joined.components().as_path();

        for entry in std::fs::read_dir("/sandbox").unwrap() {
            let entry = entry.unwrap();
            println!("Sandbox entry: {:?}", entry.path());
        }

        WalkDir::new(base)
            .into_iter()
            .filter_map(Result::ok)
            .inspect(|entry| {
                let path = entry.path();
                println!("Base: {:?}", path);
            })
            .count();

        WalkDir::new(dir_to_explore)
            .into_iter()
            .filter_map(Result::ok)
            .inspect(|entry| {
                let path = entry.path();
                println!("File: {:?}", path);
            })
            .filter(|entry| {
                let path = entry.path();
                path.is_file() && is_typescript_file(path)
            })
            .map(|entry| {
                let path_str = entry.path().to_string_lossy().to_string();
                self.load_src_file(&path_str)
            })
            .collect()
    }
}

fn is_typescript_file(path: &Path) -> bool {
    if let Some(extension) = path.extension() {
        let ext = extension.to_string_lossy().to_lowercase();
        return ext == "ts" || ext == "tsx";
    }
    false
} 