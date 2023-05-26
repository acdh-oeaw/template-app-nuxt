import { defineVitestConfig } from "nuxt-vitest/config";

export default defineVitestConfig({
	// any custom vitest config you require
	test: {
		environment: "nuxt",
		globals: true,
		include: ["./tests/*.spec.ts"],
		setupFiles: ["../tests/setupFiles/createI18n.ts"],
	},
});
