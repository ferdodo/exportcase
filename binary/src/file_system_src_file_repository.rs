use std::fs;
use std::io;
use crate::src_file::SrcFile;
use crate::src_file_repository::SrcFileRepository;

pub struct FileSystemSrcFileRepository;

impl SrcFileRepository for FileSystemSrcFileRepository {
    fn load_src_file(&self, path: &str) -> io::Result<SrcFile> {
        let content = fs::read_to_string(path)?;
        Ok(SrcFile { 
            path: path.to_string(), 
            content 
        })
    }
} 