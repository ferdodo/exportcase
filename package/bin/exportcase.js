#!/usr/bin/env node

const { WASI } = require('wasi');
const path = require('path');
const fs = require('fs');

const wasi = new WASI({
  version: 'preview1',
  returnOnExit: true,
  args: [process.argv[1], ...process.argv.slice(2)],
  env: process.env,
  preopens: {
    '/sandbox': process.cwd()
  }
});

const wasmPath = path.join(__dirname, 'exportcase.wasm');
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

(async () => {
  const wasm = await WebAssembly.compile(fs.readFileSync(wasmPath));
  const instance = await WebAssembly.instantiate(wasm, importObject);
  const exitCode = wasi.start(instance);
  process.exit(exitCode);
})(); 