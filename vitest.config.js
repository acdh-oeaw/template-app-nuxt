import { defineVitestConfig } from "nuxt-vitest/config";

export default defineVitestConfig({
	test: {
		environment: "nuxt",
		globals: true,
		include: ["./tests/*.spec.ts"],
		setupFiles: ["../tests/setup-files/create-i18n.ts"],
	},
});
