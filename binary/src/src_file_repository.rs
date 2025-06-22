use crate::src_file::SrcFile;
use std::io;

pub trait SrcFileRepository {
    fn load_src_file(&self, path: &str) -> io::Result<SrcFile>;
} 