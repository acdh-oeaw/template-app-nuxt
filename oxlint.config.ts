import { existsSync, readFileSync } from "node:fs";
import * as path from "node:path";

import { defineConfig, type OxlintGlobals } from "oxlint";

const projectRoot = import.meta.dirname;
const globalsFile = path.join(projectRoot, ".nuxt/oxlint-globals.json");

function loadNuxtGlobals(): OxlintGlobals {
	if (!existsSync(globalsFile)) {
		throw new Error("Missing generated Nuxt globals. Run `nuxt prepare` before linting.");
	}

	return JSON.parse(readFileSync(globalsFile, { encoding: "utf8" })) as OxlintGlobals;
}

const config = defineConfig({
	categories: {
		correctness: "error",
		suspicious: "warn",
	},
	env: {
		browser: true,
		builtin: true,
		esnext: true,
		node: true,
	},
	globals: loadNuxtGlobals(),
	ignorePatterns: ["content/**", "public/**"],
	jsPlugins: [
		{ name: "better-tailwindcss", specifier: "eslint-plugin-better-tailwindcss" },
		{ name: "playwright", specifier: "eslint-plugin-playwright" },
	],
	options: {
		reportUnusedDisableDirectives: "error",
		typeAware: true,
		typeCheck: true,
	},
	plugins: ["import", "node", "typescript", "vue", "oxc"],
	rules: {
		"no-shadow": "off",
		"no-underscore-dangle": "off",
		"no-unsafe-type-assertion": "off",
	},
	settings: {
		"better-tailwindcss": {
			entryPoint: path.resolve(projectRoot, "app/styles/index.css"),
		},
	},
	overrides: [
		{
			files: ["app/**/*.{ts,tsx,vue}"],
			rules: {
				/** Correctness. */
				"better-tailwindcss/no-unknown-classes": ["error", { ignore: ["lead", "not-richtext"] }],
				"better-tailwindcss/no-conflicting-classes": "error",
				"better-tailwindcss/no-restricted-classes": "error",
				/** Style. */
				"better-tailwindcss/enforce-canonical-classes": "error",
				"better-tailwindcss/enforce-consistent-class-order": ["error", { order: "strict" }],
				"better-tailwindcss/enforce-consistent-important-position": "off",
				"better-tailwindcss/enforce-consistent-line-wrapping": "off",
				"better-tailwindcss/enforce-consistent-variable-syntax": "error",
				"better-tailwindcss/enforce-consistent-variant-order": "error",
				"better-tailwindcss/enforce-logical-properties": "error",
				"better-tailwindcss/enforce-shorthand-classes": "off",
				"better-tailwindcss/no-deprecated-classes": "error",
				"better-tailwindcss/no-duplicate-classes": "error",
				"better-tailwindcss/no-unnecessary-whitespace": "error",
			},
		},
		{
			files: ["e2e/**/*.{ts,tsx}"],
			rules: {
				"playwright/consistent-spacing-between-blocks": "error",
				"playwright/expect-expect": "error",
				"playwright/max-expects": "off",
				"playwright/max-nested-describe": "error",
				"playwright/missing-playwright-await": "error",
				"playwright/no-commented-out-tests": "error",
				"playwright/no-conditional-expect": "error",
				"playwright/no-conditional-in-test": "error",
				"playwright/no-duplicate-hooks": "error",
				"playwright/no-duplicate-slow": "error",
				"playwright/no-element-handle": "error",
				"playwright/no-eval": "error",
				"playwright/no-focused-test": "error",
				"playwright/no-force-option": "error",
				"playwright/no-get-by-title": "error",
				"playwright/no-hooks": "off",
				"playwright/no-nested-step": "error",
				"playwright/no-networkidle": "error",
				"playwright/no-nth-methods": "off",
				"playwright/no-page-pause": "error",
				"playwright/no-raw-locators": "warn",
				"playwright/no-restricted-locators": "off",
				"playwright/no-restricted-matchers": "off",
				"playwright/no-restricted-roles": "off",
				"playwright/no-skipped-test": "error",
				"playwright/no-slowed-test": "warn",
				"playwright/no-standalone-expect": "error",
				"playwright/no-unsafe-references": "error",
				"playwright/no-unused-locators": "error",
				"playwright/no-useless-await": "error",
				"playwright/no-useless-not": "error",
				"playwright/no-wait-for-navigation": "error",
				"playwright/no-wait-for-selector": "error",
				"playwright/no-wait-for-timeout": "error",
				"playwright/prefer-comparison-matcher": "error",
				"playwright/prefer-equality-matcher": "error",
				"playwright/prefer-hooks-in-order": "error",
				"playwright/prefer-hooks-on-top": "error",
				"playwright/prefer-lowercase-title": "error",
				"playwright/prefer-native-locators": "error",
				"playwright/prefer-locator": "error",
				"playwright/prefer-strict-equal": "error",
				"playwright/prefer-to-be": "error",
				"playwright/prefer-to-contain": "error",
				"playwright/prefer-to-have-count": "error",
				"playwright/prefer-to-have-length": "error",
				"playwright/prefer-web-first-assertions": "error",
				"playwright/require-hook": "off",
				"playwright/require-soft-assertions": "off",
				"playwright/require-tags": "off",
				"playwright/require-to-pass-timeout": "error",
				"playwright/require-to-throw-message": "error",
				"playwright/require-top-level-describe": "error",
				"playwright/valid-describe-callback": "error",
				"playwright/valid-expect-in-promise": "error",
				"playwright/valid-expect": "error",
				"playwright/valid-title": "error",
				"playwright/valid-test-tags": "error",
			},
		},
	],
});

export default config;
