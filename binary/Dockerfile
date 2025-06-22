FROM rust AS binary-prebuild
WORKDIR /exportcase/binary
COPY Cargo.toml .
RUN mkdir -p src
RUN echo "fn main() { println!(\"Hello, world!\"); }" > src/main.rs
RUN cargo build
RUN cargo build --release

FROM exportcase-binary-prebuild
COPY . .
RUN ./check_src_max_length.sh
RUN cargo test
RUN touch src/main.rs
RUN RUSTFLAGS="-D warnings" cargo build --release
