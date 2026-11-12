import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

import { getDockerVersions, projectRoot } from "./docker-versions.ts";

const versions = getDockerVersions();
for (const directory of ["e2e/snapshots", "playwright-report", "test-results"]) {
	mkdirSync(join(projectRoot, directory), { recursive: true });
}

const result = spawnSync(
	"docker",
	[
		"compose",
		"--file",
		"e2e/docker/compose.yaml",
		"run",
		"--build",
		"--rm",
		"e2e",
		...process.argv.slice(2),
	],
	{
		cwd: projectRoot,
		stdio: "inherit",
		env: {
			...process.env,
			...Object.fromEntries(
				Object.entries(versions).map(([key, value]) => [key, process.env[key] ?? value]),
			),
			DOCKER_UID: process.env.DOCKER_UID ?? String(process.getuid?.() ?? 1000),
			DOCKER_GID: process.env.DOCKER_GID ?? String(process.getgid?.() ?? 1000),
		},
	},
);
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
