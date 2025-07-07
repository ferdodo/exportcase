import { access, copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

async function fileExists(path) {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
}

await mkdir('bin', { recursive: true });

if (await fileExists(join('..', 'binary', 'target', 'release', 'exportcase.exe'))) {
	await copyFile(
		join('..', 'binary', 'target', 'release', 'exportcase.exe'),
		join('bin', 'exportcase.exe'),
	);
}

if (await fileExists(join('..', 'binary', 'target', 'release', 'exportcase'))) {
	await copyFile(
		join('..', 'binary', 'target', 'release', 'exportcase'),
		join('bin', 'exportcase'),
	);
}

if (await fileExists(join('..', 'binary', 'target', 'wasm32-wasip1', 'release', 'exportcase.wasm'))) {
	await copyFile(
		join('..', 'binary', 'target', 'wasm32-wasip1', 'release', 'exportcase.wasm'),
		join('bin', 'exportcase.wasm'),
	);
}