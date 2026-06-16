import { defineConfig } from "oxlint";

const config = defineConfig({
	env: {
		builtin: true,
		browser: true,
	},
	plugins: ["vue"],
	overrides: [
		{
			files: ["*.vue"],
			rules: {
				/** Correctness. */
				"vue/no-arrow-functions-in-watch": "error",
				"vue/no-computed-properties-in-data": "error",
				"vue/no-deprecated-data-object-declaration": "error",
				"vue/no-deprecated-delete-set": "error",
				"vue/no-deprecated-destroyed-lifecycle": "error",
				"vue/no-deprecated-events-api": "error",
				"vue/no-deprecated-model-definition": "error",
				"vue/no-deprecated-props-default-this": "error",
				"vue/no-deprecated-vue-config-keycodes": "error",
				"vue/no-dupe-keys": "error",
				"vue/no-export-in-script-setup": "error",
				"vue/no-expose-after-await": "error",
				"vue/no-lifecycle-after-await": "error",
				"vue/no-reserved-component-names": "error",
				"vue/no-reserved-keys": "error",
				"vue/no-reserved-props": "error",
				"vue/no-shared-component-data": "error",
				"vue/no-side-effects-in-computed-properties": "error",
				"vue/no-this-in-before-route-enter": "error",
				"vue/no-watch-after-await": "error",
				"vue/prefer-import-from-vue": "error",
				"vue/require-prop-type-constructor": "error",
				"vue/require-render-return": "error",
				"vue/require-slots-as-functions": "error",
				"vue/return-in-computed-property": "error",
				"vue/return-in-emits-validator": "error",
				"vue/valid-define-emits": "error",
				"vue/valid-define-options": "error",
				"vue/valid-define-props": "error",
				"vue/valid-next-tick": "error",

				/** Restriction. */
				"vue/max-props": "off",
				"vue/no-import-compiler-macros": "error",
				"vue/no-multiple-slot-args": "error",

				/** Suspicious. */
				"vue/no-required-prop-with-default": "error",
				"vue/require-default-export": "error",

				/** Style. */
				"vue/component-definition-name-casing": "error",
				"vue/define-emits-declaration": ["error", "runtime"],
				"vue/define-props-declaration": ["error", "runtime"],
				"vue/define-props-destructuring": "error",
				"vue/next-tick-style": "error",
				"vue/prop-name-casing": "error",
				"vue/require-default-prop": "off",
				"vue/require-direct-export": "off",
				"vue/require-prop-types": "off",
				"vue/require-typed-ref": "error",
			},
		},
	],
});

export default config;
