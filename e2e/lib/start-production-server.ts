import { join } from "node:path";
import { pathToFileURL } from "node:url";

/** Exercise embedded build defaults, as in Docker, rather than parsing test env overrides again. */
for (const key of Object.keys(process.env)) {
	if (key === "NUXT_PUBLIC_APP" || key.startsWith("NUXT_PUBLIC_APP_")) {
		delete process.env[key];
	}
}

process.env.NODE_ENV = "production";
process.env.PORT = process.argv[2] ?? "3000";

await import(pathToFileURL(join(import.meta.dirname, "../../.output/server/index.mjs")).href);
