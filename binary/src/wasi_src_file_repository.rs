use std::fs;
use std::io;
use std::path::Path;
use std::process;
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
        let base = Path::new("./");
        let joined = base.join(directory);
        let dir_to_explore = joined.components().as_path();

        WalkDir::new(dir_to_explore)
            .into_iter()
            .filter_map(Result::ok)
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

pub fn create_file_iterator(
    directory: Option<String>, 
    files: Option<Vec<String>>
) -> Box<dyn Iterator<Item = Result<SrcFile, String>>> {
    let repository = WasiSrcFileRepository;
    
    match (directory, files) {
        (Some(dir), None) => {
            println!("Checking TypeScript files in directory: {}", &dir);
            let files = repository.iterate_src_files(&dir);
            Box::new(files.into_iter().map(|r| r.map_err(|e| e.to_string())))
        },
        (None, Some(file_list)) => {
            println!("Checking specific TypeScript files:");
            for file in &file_list { println!("  - {}", file); }
            Box::new(file_list.into_iter().map(move |file_path| {
                if Path::new(&file_path).exists() {
                    repository.load_src_file(&file_path).map_err(|e| e.to_string())
                } else {
                    Err(format!("File not found: {}", file_path))
                }
            }))
        },
        (Some(dir), Some(file_list)) => {
            println!("Checking TypeScript files in directory: {} and specific files:", &dir);
            for file in &file_list { println!("  - {}", file); }
            
            let dir_files = repository.iterate_src_files(&dir);
            let specific_files = file_list.into_iter().map(move |file_path| {
                if Path::new(&file_path).exists() {
                    repository.load_src_file(&file_path).map_err(|e| e.to_string())
                } else {
                    Err(format!("File not found: {}", file_path))
                }
            });
            
            Box::new(dir_files.into_iter().map(|r| r.map_err(|e| e.to_string())).chain(specific_files))
        },
        (None, None) => {
            eprintln!("Error: Either a directory or specific files must be provided");
            process::exit(1);
        }
    }
} 