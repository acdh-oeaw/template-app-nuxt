import { defineVitestConfig } from "nuxt-vitest/config";

export default defineVitestConfig({
	test: {
		environment: "nuxt",
		globals: true,
		include: ["./tests/*.spec.ts"],
		setupFiles: ["../tests/setupFiles/createI18n.ts"],
	},
});
