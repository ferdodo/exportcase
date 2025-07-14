import { access, copyFile, mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";

async function fileExists(path) {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
}

await mkdir("bin", { recursive: true });

const binaries = [
	["..", "binary", "target", "release", "exportcase.exe"],
	["..", "binary", "target", "release", "exportcase"],
	["..", "binary", "target", "release", "darwin-exportcase"],
	["..", "binary", "target", "wasm32-wasip1", "release", "exportcase.wasm"],
];

for (const binary of binaries) {
	const name = binary[binary.length - 1]

	if (await fileExists(join(...binary))) {
		await copyFile(join(...binary), join("bin", name));
		console.log("Copied file to", resolve(join("bin", name)));
	}
}
