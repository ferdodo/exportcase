# exportcase

[![Npm package](https://img.shields.io/npm/v/exportcase.svg)](https://www.npmjs.com/package/exportcase)
[![npm](https://img.shields.io/npm/dw/exportcase)](https://www.npmjs.com/package/exportcase)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/exportcase)
[![npm](https://img.shields.io/badge/website-🌐-blue)](https://ferdodo.github.io/exportcase)

Opinionated file name validator for TypeScript.

## Features

- Enforces typescript file name based on ESM exports.
- Support TSX files.
- Zero config.

## Installation

```bash
npm install --save-dev exportcase
```

## Usage

```bash
exportcase check ./src
```

## Validation Rules

- **One named export per file**: Each file must have at most one named export.
- **File name must match the export**: The file name (without extension) must match the name of the single named export or the default export.
- **Star exports are only allowed in index files**: `export * from ...` is only allowed in files named `index.ts`.
