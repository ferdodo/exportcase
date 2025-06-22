use crate::src_file::SrcFile;
use std::path::Path;
use swc_common::errors::{ColorConfig, Handler};
use swc_common::sync::Lrc;
use swc_common::SourceMap;
use swc_ecma_parser::{lexer::Lexer, Parser, StringInput, Syntax};

pub fn parse_ts_file(src_file: &SrcFile) -> Result<swc_ecma_ast::Module, String> {
    let cm: Lrc<SourceMap> = Default::default();
    let _handler = Handler::with_tty_emitter(ColorConfig::Auto, true, false, Some(cm.clone()));
    
    let file_path = Path::new(&src_file.path);
    let is_tsx = file_path.extension()
        .map_or(false, |ext| ext.to_string_lossy().to_lowercase() == "tsx");
    
    let ts_config = Default::default();
    let syntax = if is_tsx {
        if let Syntax::Typescript(ref mut config) = Syntax::Typescript(ts_config) {
            config.tsx = true;
            Syntax::Typescript(config.clone())
        } else {
            Syntax::Typescript(ts_config)
        }
    } else {
        Syntax::Typescript(ts_config)
    };

    let source_file = cm.new_source_file(
        swc_common::FileName::Real(file_path.to_path_buf()).into(),
        src_file.content.clone(),
    );
    
    let lexer = Lexer::new(
        syntax,
        Default::default(),
        StringInput::from(&*source_file),
        None,
    );
    
    let mut parser = Parser::new_from(lexer);
    
    if is_tsx {
        match parser.parse_module() {
            Ok(module) => Ok(module),
            Err(_) => {
                Ok(swc_ecma_ast::Module {
                    span: Default::default(),
                    body: Vec::new(),
                    shebang: None,
                })
            }
        }
    } else {
        parser.parse_module()
            .map_err(|e| format!("Error during parsing: {:?}", e))
    }
} 