import { defineConfig } from "oxlint";

const config = defineConfig({
	env: {
		builtin: true,
		browser: true,
	},
	plugins: ["vitest"],
	overrides: [
		{
			files: ["**/*.test.ts", "!e2e/**/*.test.ts"],
			rules: {
				/**
				 * ============================================================================================================
				 * Correctness.
				 * ============================================================================================================
				 */

				"vitest/consistent-each-for": "error",
				"vitest/expect-expect": "error",
				"vitest/hoisted-apis-on-top": "error",
				"vitest/no-conditional-expect": "error",
				"vitest/no-conditional-tests": "error",
				"vitest/no-disabled-tests": "error",
				"vitest/no-focused-tests": "error",
				"vitest/no-standalone-expect": "error",
				"vitest/prefer-snapshot-hint": "error",
				"vitest/require-local-test-context-for-concurrent-snapshots": "error",
				"vitest/require-awaited-expect-poll": "error",
				"vitest/require-mock-type-parameters": "error",
				"vitest/require-to-throw-message": "error",
				"vitest/valid-describe-callback": "error",
				"vitest/valid-expect": "error",
				"vitest/valid-expect-in-promise": "error",
				"vitest/valid-title": "error",
				"vitest/warn-todo": "error",

				/**
				 * ============================================================================================================
				 * Suspicious.
				 * ============================================================================================================
				 */

				"vitest/no-commented-out-tests": "error",

				/**
				 * ============================================================================================================
				 * Pedantic.
				 * ============================================================================================================
				 */

				"vitest/no-conditional-in-test": "warn",

				/**
				 * ============================================================================================================
				 * Restriction.
				 * ============================================================================================================
				 */

				"vitest/require-test-timeout": "off",

				/**
				 * ============================================================================================================
				 * Style.
				 * ============================================================================================================
				 */

				"vitest/consistent-test-filename": "off",
				"vitest/consistent-test-it": ["error", { fn: "test" }],
				"vitest/consistent-vitest-vi": "error",
				"vitest/max-expects": "off",
				"vitest/max-nested-describe": "off",
				"vitest/no-alias-methods": "error",
				"vitest/no-duplicate-hooks": "error",
				"vitest/no-hooks": "off",
				"vitest/no-identical-title": "error",
				"vitest/no-import-node-test": "error",
				"vitest/no-importing-vitest-globals": "off",
				"vitest/no-interpolation-in-snapshots": "error",
				"vitest/no-large-snapshots": "warn",
				"vitest/no-mocks-import": "error",
				"vitest/no-restricted-matchers": "off",
				"vitest/no-restricted-vi-methods": "off",
				"vitest/no-test-prefixes": "error",
				"vitest/no-test-return-statement": "error",
				"vitest/no-unneeded-async-expect-function": "error",
				"vitest/padding-around-after-all-blocks": "error",
				"vitest/prefer-called-exactly-once-with": "error",
				"vitest/prefer-called-once": "error",
				"vitest/prefer-called-times": "error",
				"vitest/prefer-called-with": "warn",
				"vitest/prefer-comparison-matcher": "error",
				"vitest/prefer-describe-function-title": "off",
				"vitest/prefer-each": "error",
				"vitest/prefer-equality-matcher": "error",
				"vitest/prefer-expect-assertions": "error",
				"vitest/prefer-expect-resolves": "error",
				"vitest/prefer-expect-type-of": "error",
				"vitest/prefer-hooks-in-order": "error",
				"vitest/prefer-hooks-on-top": "error",
				"vitest/prefer-import-in-mock": "error",
				"vitest/prefer-importing-vitest-globals": "error",
				"vitest/prefer-lowercase-title": "error",
				"vitest/prefer-mock-promise-shorthand": "error",
				"vitest/prefer-mock-return-shorthand": "error",
				"vitest/prefer-spy-on": "error",
				"vitest/prefer-strict-boolean-matchers": "error",
				"vitest/prefer-strict-equal": "error",
				"vitest/prefer-to-be": "error",
				"vitest/prefer-to-be-falsy": "error",
				"vitest/prefer-to-be-object": "error",
				"vitest/prefer-to-be-truthy": "error",
				"vitest/prefer-to-contain": "error",
				"vitest/prefer-to-have-been-called-times": "error",
				"vitest/prefer-to-have-length": "error",
				"vitest/prefer-todo": "error",
				"vitest/require-hook": "error",
				"vitest/require-top-level-describe": "error",
			},
		},
	],
});

export default config;
