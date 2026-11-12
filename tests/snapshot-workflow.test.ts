import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("../scripts/update-snapshots-ci.ts", import.meta.url));

for (const scenario of [
	"success",
	"failed-workflow",
	"failed-download",
	"empty-artifact",
	"dirty-checkout",
	"edited-during-run",
] as const) {
	await test(`CI snapshots: ${scenario}`, async () => {
		const directory = await mkdtemp(join(tmpdir(), "snapshot-workflow-test-"));
		try {
			const cwd = join(directory, "repo");
			const bin = join(directory, "bin");
			await mkdir(join(cwd, "e2e/snapshots"), { recursive: true });
			await mkdir(bin);
			await writeFile(join(cwd, "e2e/snapshots/old.png"), "old baseline");
			const git = (...args: string[]) =>
				execFileSync("git", args, {
					cwd,
					encoding: "utf8",
					stdio: ["ignore", "pipe", "pipe"],
				}).trim();
			git("init", "-b", "main");
			git("add", ".");
			git(
				"-c",
				"user.name=Test",
				"-c",
				"user.email=test@example.com",
				"commit",
				"-m",
				"Initial baseline",
			);
			// A local origin is enough to exercise the pushed-commit check without network access.
			git("remote", "add", "origin", cwd);
			if (scenario === "dirty-checkout")
				await writeFile(join(cwd, "uncommitted.txt"), "local change");
			await writeFile(
				join(bin, "gh"),
				`#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const args = process.argv.slice(2);
fs.appendFileSync(process.env.TEST_LOG, JSON.stringify(args) + "\\n");
if (args[0] === "workflow") fs.writeFileSync(process.env.TEST_DISPATCHED, "yes");
else if (args[1] === "list") console.log(JSON.stringify(fs.existsSync(process.env.TEST_DISPATCHED) ? [
  { databaseId: 99, headSha: "wrong-commit" },
  { databaseId: 42, headSha: process.env.TEST_COMMIT }
] : []));
else if (args[1] === "watch") {
  if (process.env.TEST_SCENARIO === "edited-during-run") fs.writeFileSync("local-change.txt", "keep this");
  process.exit(process.env.TEST_SCENARIO === "failed-workflow" ? 1 : 0);
}
else if (args[1] === "download" && process.env.TEST_SCENARIO === "failed-download") process.exit(1);
else if (args[1] === "download" && process.env.TEST_SCENARIO !== "empty-artifact") {
  const dir = args[args.indexOf("--dir") + 1];
  fs.mkdirSync(path.join(dir, "pages"));
  fs.writeFileSync(path.join(dir, "pages/new.png"), "new baseline");
}
`,
				{ mode: 0o755 },
			);
			const result = spawnSync(process.execPath, [script], {
				cwd,
				encoding: "utf8",
				env: {
					...process.env,
					PATH: `${bin}${delimiter}${process.env.PATH}`,
					TEST_COMMIT: git("rev-parse", "HEAD"),
					TEST_LOG: join(directory, "commands.jsonl"),
					TEST_DISPATCHED: join(directory, "dispatched"),
					TEST_SCENARIO: scenario,
				},
			});
			if (scenario === "success") {
				assert.equal(result.status, 0, result.stderr);
				assert.equal(
					await readFile(join(cwd, "e2e/snapshots/pages/new.png"), "utf8"),
					"new baseline",
				);
				await assert.rejects(readFile(join(cwd, "e2e/snapshots/old.png")));
				const commands = await readFile(join(directory, "commands.jsonl"), "utf8");
				assert.match(commands, /\["run","watch","42","--exit-status"\]/);
			} else {
				assert.notEqual(result.status, 0);
				assert.equal(await readFile(join(cwd, "e2e/snapshots/old.png"), "utf8"), "old baseline");
				if (scenario === "dirty-checkout") {
					await assert.rejects(readFile(join(directory, "commands.jsonl")));
				}
			}
		} finally {
			await rm(directory, { recursive: true, force: true });
		}
	});
}
