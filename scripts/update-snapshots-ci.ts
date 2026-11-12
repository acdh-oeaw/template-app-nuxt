import { execFileSync, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { cp, mkdtemp, readdir, rename, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

/** Download completely before replacing baselines; retain a backup if replacement fails. */
export async function replaceSnapshots(downloadDir: string, snapshotsDir: string) {
	const files = await readdir(downloadDir, { recursive: true });
	if (!files.some((file) => file.endsWith(".png"))) {
		throw new Error("The snapshot artifact contains no PNG files; local snapshots were preserved.");
	}
	const backup = `${snapshotsDir}.previous`;
	if (existsSync(backup)) throw new Error(`Snapshot backup already exists: ${backup}`);
	// Stage on the same filesystem as the destination, so rename is atomic.
	const candidate = `${snapshotsDir}.incoming`;
	if (existsSync(candidate))
		throw new Error(`Snapshot staging directory already exists: ${candidate}`);
	await cp(downloadDir, candidate, { recursive: true });
	const hadSnapshots = existsSync(snapshotsDir);
	if (hadSnapshots) await rename(snapshotsDir, backup);
	try {
		await rename(candidate, snapshotsDir);
	} catch (error) {
		if (hadSnapshots) await rename(backup, snapshotsDir);
		throw error;
	} finally {
		await rm(candidate, { recursive: true, force: true });
	}
	await rm(backup, { recursive: true, force: true });
}

export async function updateSnapshotsFromCI(cwd = process.cwd()) {
	function run(command: string, args: string[]) {
		return execFileSync(command, args, { cwd, encoding: "utf8" }).trim();
	}
	function requireCleanCheckout() {
		if (run("git", ["status", "--porcelain"])) {
			throw new Error("Commit or stash local changes first; CI tests the pushed commit.");
		}
	}
	requireCleanCheckout();
	const branch = run("git", ["branch", "--show-current"]);
	if (!branch) throw new Error("Check out a branch before requesting CI snapshots.");
	const commit = run("git", ["rev-parse", "HEAD"]);
	const remoteCommit = run("git", ["ls-remote", "origin", `refs/heads/${branch}`]).split("\t")[0];
	if (remoteCommit !== commit) throw new Error(`Push ${branch} first; origin differs from HEAD.`);

	const workflow = "validate.yaml";
	const listArgs = [
		"run",
		"list",
		"--workflow",
		workflow,
		"--branch",
		branch,
		"--commit",
		commit,
		"--event",
		"workflow_dispatch",
		"--json",
		"databaseId,headSha",
	];
	const existing = new Set(
		(JSON.parse(run("gh", listArgs)) as Array<{ databaseId: number }>).map(
			(item) => item.databaseId,
		),
	);
	run("gh", ["workflow", "run", workflow, "--ref", branch, "-f", "update-snapshots=true"]);

	const deadline = Date.now() + 60_000;
	let runId: number | undefined;
	while (Date.now() < deadline) {
		const runs = JSON.parse(run("gh", listArgs)) as Array<{ databaseId: number; headSha: string }>;
		runId = runs.find(
			(item) => item.headSha === commit && !existing.has(item.databaseId),
		)?.databaseId;
		if (runId !== undefined) break;
		await delay(3000);
	}
	if (runId === undefined) throw new Error("Timed out waiting for the snapshot workflow to start.");
	const watched = spawnSync("gh", ["run", "watch", String(runId), "--exit-status"], {
		cwd,
		stdio: "inherit",
	});
	if (watched.error) throw watched.error;
	if (watched.status !== 0)
		throw new Error("Snapshot workflow failed; local snapshots were preserved.");

	const downloadDir = await mkdtemp(join(tmpdir(), "nuxt-snapshots-"));
	try {
		run("gh", ["run", "download", String(runId), "--name", "snapshots", "--dir", downloadDir]);
		requireCleanCheckout();
		if (run("git", ["rev-parse", "HEAD"]) !== commit) {
			throw new Error("HEAD changed while CI ran; local snapshots were preserved.");
		}
		await replaceSnapshots(downloadDir, join(cwd, "e2e/snapshots"));
	} finally {
		await rm(downloadDir, { recursive: true, force: true });
	}
	process.stdout.write("Updated e2e/snapshots from CI. Review and commit the changes.\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	await updateSnapshotsFromCI();
}
