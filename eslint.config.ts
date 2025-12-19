import * as path from "node:path";

import baseConfig from "@acdh-oeaw/eslint-config";
import nodeConfig from "@acdh-oeaw/eslint-config-node";
import nuxtConfig from "@acdh-oeaw/eslint-config-nuxt";
import playwrightConfig from "@acdh-oeaw/eslint-config-playwright";
import tailwindcssConfig from "@acdh-oeaw/eslint-config-tailwindcss";
import vueConfig from "@acdh-oeaw/eslint-config-vue";
import gitignore from "eslint-config-flat-gitignore";
import checkFilePlugin from "eslint-plugin-check-file";
import { defineConfig, globalIgnores } from "eslint/config";

import { withNuxt } from "./.nuxt/eslint.config.mjs";

const KEBAB_CASE = "+([a-z])*([a-z0-9])*(-+([a-z0-9]))";
const CAMEL_CASE = "+([a-z])*([a-z0-9])*([A-Z]*([a-z0-9]))";
const DYNAMIC_SEGMENTS = `\\[?(\\[)${CAMEL_CASE}\\]?(\\[)`;
const CATCH_ALL_SEGMENTS = `\\[...${CAMEL_CASE}\\]`;
const MIDDLE_EXTENSION = "*(.+([a-z0-9]))";

const configs = defineConfig(
	gitignore({ strict: false }),
	globalIgnores(["content/**", "public/**"]),
	baseConfig,
	/** Sorting is handled by `oxfmt` now. */
	{
		rules: {
			"simple-import-sort/imports": "off",
			"simple-import-sort/exports": "off",
		},
	},
	vueConfig,
	nuxtConfig,
	{
		name: "tailwindcss-config",
		extends: [tailwindcssConfig],
		rules: {
			"better-tailwindcss/no-unknown-classes": ["error", { ignore: ["lead", "not-richtext"] }],
		},
		settings: {
			"better-tailwindcss": {
				entryPoint: path.resolve("./app/styles/index.css"),
			},
		},
	},
	playwrightConfig,
	{
		files: ["**/*.vue"],
		rules: {
			"vue/attributes-order": ["warn", { alphabetical: true }],
		},
	},
	{
		files: ["server/**/*.ts"],
		extends: [nodeConfig],
	},
	{
		plugins: {
			"check-file": checkFilePlugin,
		},
		rules: {
			"check-file/filename-naming-convention": [
				"error",
				{
					"**/*": `@(${KEBAB_CASE}${MIDDLE_EXTENSION}|${DYNAMIC_SEGMENTS}${MIDDLE_EXTENSION}|${CATCH_ALL_SEGMENTS}${MIDDLE_EXTENSION})`,
				},
			],
			"check-file/folder-naming-convention": [
				"error",
				{
					"**/": `@(${KEBAB_CASE}|${DYNAMIC_SEGMENTS}|${CATCH_ALL_SEGMENTS})`,
				},
			],
		},
	},
);

export default withNuxt(configs);
