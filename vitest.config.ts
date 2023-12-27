import { defineVitestConfig } from "@nuxt/test-utils/config";
import { configDefaults } from "vitest/config";

// FIXME: currently, i18n only works with `$t` global, but not with the `useI18n` composable
// @see https://github.com/nuxt-modules/i18n/issues/2637

export default defineVitestConfig({
	test: {
		environment: "nuxt",
		environmentOptions: {
			nuxt: {
				domEnvironment: "jsdom",
			},
		},
		/** Required by `@testing-library/vue`. */
		globals: true,
		include: ["./**/*.@(spec|test).ts"],
		exclude: [...configDefaults.exclude, "e2e"],
	},
});
