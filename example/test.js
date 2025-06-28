#!/usr/bin/env zx

import { $ } from "zx";
import { rename } from "fs/promises";

const result = await $`exportcase check src`;
console.log(result.stdout);
await rename("./src/greet.ts", "./src/salutation.ts");

try {
    await $`exportcase check src`;
    process.exit(1);
} catch (err) {
    process.exit(0);
}

await rename("./src/salutation.ts", "./src/greet.ts");
