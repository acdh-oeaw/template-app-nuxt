import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { defineNuxtModule } from "@nuxt/kit";
/**
 * Nitro v3 no longer exposes its auto-imports on the nitro instance (`nitro.unimport`). The
 * builder-neutral server build description is currently only available as internal api.
 */
import { useServerBuild } from "@nuxt/kit/internal";
import type { NuxtHooks } from "nuxt/schema";
import type { OxlintGlobals } from "oxlint";

type ImportRegistry = Pick<Parameters<NuxtHooks["imports:context"]>[0], "getImports">;

export default defineNuxtModule({
	meta: {
		name: "oxlint-globals",
	},
	setup(_options, nuxt) {
		const outputPath = path.join(nuxt.options.buildDir, "oxlint-globals.json");
		let appImports: ImportRegistry | undefined;

		nuxt.hook("imports:context", (context) => {
			appImports = context;
		});

		/** @see https://github.com/nuxt/eslint/blob/main/packages/module/src/modules/config/addons/globals.ts */
		nuxt.hook("app:templatesGenerated", async () => {
			const imports = [
				...((await appImports?.getImports()) ?? []),
				/** Only available after the server builder has initialised. */
				...((await useServerBuild(nuxt).imports?.()) ?? []),
			];
			const globals = new Set(
				imports
					.filter((entry) => entry.type !== true)
					.map((entry) => entry.as ?? entry.name)
					.filter((name) => /^[A-Za-z_$][\w$]*$/.test(name)),
			);

			mkdirSync(nuxt.options.buildDir, { recursive: true });

			const sortedGlobals = Object.fromEntries(
				[...globals]
					.sort((left, right) => left.localeCompare(right))
					.map((name) => [name, "readonly"] as const),
			) as OxlintGlobals;

			writeFileSync(outputPath, `${JSON.stringify(sortedGlobals, null, 2)}\n`);
		});
	},
});
