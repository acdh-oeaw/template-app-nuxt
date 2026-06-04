import { existsSync, readFileSync } from "node:fs";
import * as path from "node:path";

import { defineConfig, type OxlintGlobals } from "oxlint";

import base from "./config/oxlint/base.ts";
import playwright from "./config/oxlint/playwright.ts";
import regexp from "./config/oxlint/regexp.ts";
import tailwindcss from "./config/oxlint/tailwindcss.ts";
import vitest from "./config/oxlint/vitest.ts";
import vue from "./config/oxlint/vue.ts";

const projectRoot = import.meta.dirname;
const globalsFile = path.join(projectRoot, ".nuxt/oxlint-globals.json");

function loadNuxtGlobals(): OxlintGlobals {
	if (!existsSync(globalsFile)) {
		throw new Error("Missing generated Nuxt globals. Run `nuxt prepare` before linting.");
	}

	return JSON.parse(readFileSync(globalsFile, { encoding: "utf8" })) as OxlintGlobals;
}

const config = defineConfig({
	globals: loadNuxtGlobals(),
	ignorePatterns: ["content/**", "public/**"],
	options: {
		reportUnusedDisableDirectives: "error",
		typeAware: true,
		typeCheck: true,
	},
	extends: [base, playwright, regexp, tailwindcss, vitest, vue],
	settings: {
		"better-tailwindcss": {
			entryPoint: path.resolve(projectRoot, "app/styles/index.css"),
		},
	},
});

export default config;
