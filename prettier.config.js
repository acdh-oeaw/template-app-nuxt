/** @typedef {import("prettier").Config} Config */
/** @typedef {import("prettier").Plugin} Plugin */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} */

import preset from "@acdh-oeaw/prettier-config";

/** @type {Config} */
const config = {
	...preset,
	plugins: [
		...(preset.plugins ?? []),
		/**
		 * The vscode prettier extension does not work with plugin imports.
		 *
		 * @see https://github.com/prettier/prettier-vscode/issues/3066
		 */
		/** @type {Plugin<PluginOptions>} */
		"prettier-plugin-tailwindcss",
	],
	tailwindFunctions: ["cn", "styles"],
	tailwindStylesheet: "./app/styles/index.css",
};

export default config;
