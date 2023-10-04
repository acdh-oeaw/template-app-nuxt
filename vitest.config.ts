import { defineVitestConfig } from "nuxt-vitest/config";

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
		include: ["./test/*.@(spec|test).ts"],
		setupFiles: ["./test/setup-files/create-i18n.ts"],
	},
});
