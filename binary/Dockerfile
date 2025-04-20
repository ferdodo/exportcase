FROM rust
WORKDIR /exportcase/binary
COPY . .
RUN cargo build --release
RUN cp target/release/exportcase /usr/local/bin/
