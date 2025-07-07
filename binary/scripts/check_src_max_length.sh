#!/bin/bash

SRC_DIR="src"
MAX_LINES=150

find "$SRC_DIR" -type f -name "*.rs" | while read -r file; do
    line_count=$(wc -l < "$file")
    if [ "$line_count" -gt "$MAX_LINES" ]; then
        echo "Error: '$file' has $line_count lines (maximum allowed: $MAX_LINES)."
        exit 1
    fi
done
