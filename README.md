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
$ npx exportcase --help
A TypeScript validator that ensures file names match their exported name

Usage: exportcase [COMMAND]

Commands:
  check   Check TypeScript files in the specified directory
  format  Generate a bash script to rename files according to their exports
  help    Print this message or the help of the given subcommand(s)

Options:
  -h, --help Print help
  -V, --version Print version
```

## Checking files

```bash
exportcase check ./src
```

## Validation Rules

Validation rules are documented at https://ferdodo.github.io/exportcase