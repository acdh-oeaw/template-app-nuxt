import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const projectRoot = fileURLToPath(new URL("../", import.meta.url));

function exactVersion(value: string): string {
	if (!/^\^?\d+\.\d+\.\d+$/.test(value)) {
		throw new Error(`Expected an exact version or caret range, received ${value}`);
	}
	return value.replace(/^\^/, "");
}

export function getDockerVersions() {
	const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
	const packages = JSON.parse(
		execFileSync("pnpm", ["list", "@playwright/test", "--lockfile-only", "--json"], {
			cwd: projectRoot,
			encoding: "utf8",
		}),
	);

	return {
		NODE_VERSION: exactVersion(manifest.devEngines.runtime.version),
		PNPM_VERSION: exactVersion(manifest.devEngines.packageManager.version),
		PLAYWRIGHT_VERSION: exactVersion(packages[0].devDependencies["@playwright/test"].version),
	};
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	const versions = getDockerVersions();
	if (process.argv.includes("--github-output")) {
		for (const [key, value] of Object.entries(versions)) {
			process.stdout.write(`${key}=${value}\n`);
		}
	} else {
		process.stdout.write(`${JSON.stringify(versions, null, 2)}\n`);
	}
}
