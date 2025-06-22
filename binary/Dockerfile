FROM rust AS binary-prebuild
WORKDIR /exportcase/binary
COPY Cargo.toml .
RUN mkdir -p src
RUN echo "fn main() { println!(\"Hello, world!\"); }" > src/main.rs
RUN cargo build
RUN rustup target add wasm32-wasip1
RUN cargo build --target wasm32-wasip1
RUN cargo build --release --target wasm32-wasip1

FROM exportcase-binary-prebuild
COPY . .
RUN ./check_src_max_length.sh
RUN cargo test
RUN touch src/main.rs
RUN RUSTFLAGS="-D warnings" cargo build --release --target wasm32-wasip1
