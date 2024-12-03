/** @typedef {import("typescript-eslint").Config} Config */

import baseConfig from "@acdh-oeaw/eslint-config";
import nodeConfig from "@acdh-oeaw/eslint-config-node";
import nuxtConfig from "@acdh-oeaw/eslint-config-nuxt";
import playwrightConfig from "@acdh-oeaw/eslint-config-playwright";
import tailwindcssConfig from "@acdh-oeaw/eslint-config-tailwindcss";
import vueConfig from "@acdh-oeaw/eslint-config-vue";
import gitignore from "eslint-config-flat-gitignore";
// @ts-expect-error Missing type declaration.
import checkFilePlugin from "eslint-plugin-check-file";

import { withNuxt } from "./.nuxt/eslint.config.mjs";

const KEBAB_CASE = "+([a-z])*([a-z0-9])*(-+([a-z0-9]))";
const CAMEL_CASE = "+([a-z])*([a-z0-9])*([A-Z]*([a-z0-9]))";
const DYNAMIC_SEGMENTS = `\\[${CAMEL_CASE}\\]`;
const CATCH_ALL_SEGMENTS = `\\[...${CAMEL_CASE}\\]`;
const MIDDLE_EXTENSION = "*(.+([a-z0-9]))";

/** @type {Config} */
const config = [
	gitignore({ strict: false }),
	...baseConfig,
	...vueConfig,
	...nuxtConfig,
	...tailwindcssConfig,
	...playwrightConfig,
	{
		rules: {
			"vue/attributes-order": ["warn", { alphabetical: true }],
		},
	},
	...nodeConfig.map((config) => {
		return {
			files: ["server/**/*.ts"],
			...config,
		};
	}),
	{
		plugins: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			"check-file": checkFilePlugin,
		},
		rules: {
			"check-file/filename-naming-convention": [
				"error",
				{
					"**/*": `@(${KEBAB_CASE}${MIDDLE_EXTENSION}|${DYNAMIC_SEGMENTS}|${CATCH_ALL_SEGMENTS})`,
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
];

export default withNuxt(/** @type {any} */ (config));
