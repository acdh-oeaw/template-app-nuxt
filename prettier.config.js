/** @typedef {import("prettier").Config} Config */

import preset from "@acdh-oeaw/prettier-config";

/** @type {Config} */
const config = {
	...preset,
	plugins: [...(preset.plugins ?? []), "prettier-plugin-tailwindcss"],
	tailwindFunctions: ["cn", "styles"],
	tailwindStylesheet: "./app/styles/index.css",
};

export default config;
