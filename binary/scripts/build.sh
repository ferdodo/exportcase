#!/bin/bash
set -e
cargo test
cargo build
cargo build --target wasm32-wasip1
cargo build --release
cargo build --release --target wasm32-wasip1