#!/usr/bin/env zx

import { $ } from "zx";
import { rename } from "fs/promises";
import path from "path";

const srcDir = path.resolve("src");
const greetPath = path.join(srcDir, "greet.ts");
const salutationPath = path.join(srcDir, "salutation.ts");

const result = await $`exportcase check ${srcDir}`;
console.log(result.stdout);

await rename(greetPath, salutationPath);

try {
	await $`exportcase check ${srcDir}`;
	process.exit(1);
} catch (err) {
	await rename(salutationPath, greetPath);
	process.exit(0);
}
