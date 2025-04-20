# exportcase

A TypeScript validator that ensures file names match their exported name.

## Features

- Enforces strict file name conventions based on exported content
- Supports TSX files
- Provides clear error messages with suggestions for correct naming

## Installation

```bash
npm install --save-dev exportcase
```

## Usage

### Command Line

exportcase check ./src

## Validation Rules

exportcase enforces the following naming convention:

- File names must exactly match the name of the single named export