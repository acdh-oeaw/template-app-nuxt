import { defineConfig } from "oxfmt";

const config = defineConfig({
	ignorePatterns: ["pnpm-workspace.yaml", "/content", "/e2e/snapshots", "/public"],
	jsdoc: true,
	sortImports: {
		groups: [
			["side_effect"],
			["side_effect_style"],
			["style"],
			["builtin"],
			["external"],
			["internal", "subpath"],
			["unknown"],
		],
	},
	sortPackageJson: {
		sortScripts: true,
	},
	useTabs: true,
});

export default config;
