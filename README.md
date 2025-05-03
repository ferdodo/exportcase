# exportcase

[![Npm package](https://img.shields.io/npm/v/exportcase.svg)](https://www.npmjs.com/package/exportcase)
[![npm](https://img.shields.io/npm/dw/exportcase)](https://www.npmjs.com/package/exportcase)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/exportcase)
[![npm](https://img.shields.io/badge/website-🌐-blue)](https://ferdodo.github.io/exportcase)

Opinionated file name validator for TypeScript.

## Features

- Enforces strict file name conventions based on ESM exports.
- Zero config.

## Installation

```bash
npm install --save-dev exportcase
```

## Usage

### Command Line

```bash
exportcase check ./src
```

## Validation Rules

- **One named export per file**: Each file must have at most one named export.
- **File name must match the export**: The file name (without extension) must match the name of the single named export or the default export.
- **Star exports are only allowed in index files**: `export * from ...` is only allowed in files named `index.ts` or `index.tsx`.

Files with no exports are allowed, but will not be matched against any export.

