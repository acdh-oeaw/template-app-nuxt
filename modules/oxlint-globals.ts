import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { defineNuxtModule } from "@nuxt/kit";
import type { OxlintGlobals } from "oxlint";

export default defineNuxtModule({
	meta: {
		name: "oxlint-globals",
	},
	setup(_options, nuxt) {
		const outputPath = path.join(nuxt.options.buildDir, "oxlint-globals.json");
		const globals = new Set<string>();

		const collectImportName = (entry: string | { as?: string; name?: string; type?: boolean }) => {
			if (typeof entry === "string") {
				if (/^[A-Za-z_$][\w$]*$/.test(entry)) {
					globals.add(entry);
				}

				return;
			}

			if (entry.type === true) {
				return;
			}

			const candidate = entry.as ?? entry.name;
			if (typeof candidate === "string" && /^[A-Za-z_$][\w$]*$/.test(candidate)) {
				globals.add(candidate);
			}
		};

		nuxt.hook("imports:sources", (presets) => {
			for (const preset of presets as Array<{
				imports?: Array<string | { as?: string; name?: string; type?: boolean }>;
			}>) {
				for (const entry of preset.imports ?? []) {
					collectImportName(entry);
				}
			}
		});

		nuxt.hook("app:templatesGenerated", () => {
			if (!existsSync(nuxt.options.buildDir)) {
				mkdirSync(nuxt.options.buildDir, { recursive: true });
			}

			const sortedGlobals = Object.fromEntries(
				[...globals]
					.sort((left, right) => left.localeCompare(right))
					.map((name) => [name, "readonly"] as const),
			) as OxlintGlobals;

			writeFileSync(outputPath, `${JSON.stringify(sortedGlobals, null, 2)}\n`);
		});
	},
});
