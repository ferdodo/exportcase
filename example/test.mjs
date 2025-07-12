#!/usr/bin/env node

import { rename } from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const srcDir = path.join(".", "src");
const greetPath = path.join(srcDir, "greet.ts");
const salutationPath = path.join(srcDir, "salutation.ts");

try {
    const result = await execAsync(`exportcase check ${srcDir}`);
    console.log(result.stdout);
    await rename(greetPath, salutationPath);
    await execAsync(`exportcase check ${srcDir}`);
    process.exit(1);
} catch (err) {
    console.log(err)
    await rename(salutationPath, greetPath);
    process.exit(0);
}
