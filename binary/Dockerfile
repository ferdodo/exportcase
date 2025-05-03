FROM rust AS binary-prebuild
WORKDIR /exportcase/binary
COPY Cargo.toml .
RUN mkdir -p src
RUN echo "fn main() { println!(\"Hello, world!\"); }" > src/main.rs
RUN cargo build
RUN cargo build --release

FROM exportcase-binary-prebuild
COPY . .
RUN cargo test
RUN cargo build --release
RUN cp target/release/exportcase /usr/local/bin/
