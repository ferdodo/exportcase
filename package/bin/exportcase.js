#!/usr/bin/env node

const { WASI } = require("wasi");
const path = require("path");
const fs = require("fs");
const { spawnSync } = require("child_process");

const isWindows = process.platform === "win32";
const exePathWin = path.join(__dirname, "exportcase.exe");
const isLinux = process.platform === "linux";
const exePathLinux = path.join(__dirname, "exportcase");
const isMac = process.platform === "darwin";
const exePathMac = path.join(__dirname, "darwin-exportcase");

console.log({ isWindows, isLinux, isMac, platform: process.platform });

if (isWindows && fs.existsSync(exePathWin)) {
	const args = process.argv.slice(2);
	const result = spawnSync(exePathWin, args, { stdio: "inherit" });
	process.exit(result.status ?? 0);
} else if (isLinux && fs.existsSync(exePathLinux)) {
	const args = process.argv.slice(2);
	const result = spawnSync(exePathLinux, args, { stdio: "inherit" });
	process.exit(result.status ?? 0);
} else if (isMac && fs.existsSync(exePathMac)) {
	console.log("Running mac fallback executable", exePathMac);
	const args = process.argv.slice(2);

	const result = spawnSync(exePathMac, args, {
		stdio: "inherit",
		encoding: "utf-8",
	});
	
	const status = result.status ?? 0;

	if (status !== 0) {
		console.log({ result });
		console.log("stdin", result.stdin);
		console.log("stdin", result.stdin);
	}

	process.exit(result.status ?? 0);
} else {
	console.log("Running webassembly");

	const wasi = new WASI({
		version: "preview1",
		returnOnExit: true,
		args: [process.argv[1], ...process.argv.slice(2)],
		env: process.env,
		preopens: {
			"/": process.cwd(),
		},
	});

	const wasmPath = path.join(__dirname, "exportcase.wasm");
	const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

	(async () => {
		const wasm = await WebAssembly.compile(fs.readFileSync(wasmPath));
		const instance = await WebAssembly.instantiate(wasm, importObject);
		const exitCode = wasi.start(instance);
		process.exit(exitCode);
	})();
}
