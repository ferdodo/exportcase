FROM rust AS binary-prebuild

WORKDIR /exportcase/binary
COPY Cargo.toml .
COPY scripts scripts
RUN ./scripts/setup-linux.sh
RUN mkdir -p src
RUN echo "fn main() { println!(\"Hello, world!\"); }" > src/main.rs
RUN ./scripts/build-linux.sh

FROM exportcase-binary-prebuild
COPY . .
RUN ./scripts/check_src_max_length.sh
RUN cargo test
RUN touch src/main.rs
RUN ./scripts/build-linux.sh
