import { fileURLToPath } from "node:url";

import { env } from "./config/env.config";
import { defaultLocale, locales } from "./config/i18n.config";

export default defineNuxtConfig({
	alias: {
		"@": fileURLToPath(new URL("./src", import.meta.url)),
		"~": fileURLToPath(new URL("./", import.meta.url)),
	},
	content: {
		defaultLocale,
		locales: Object.keys(locales),
		markdown: {},
	},
	css: [
		"@fontsource-variable/inter/slnt.css",
		"tailwindcss/tailwind.css",
		"@stefanprobst/css-reset/reset.css",
		"@/styles/index.css",
	],
	devtools: {
		enabled: true,
	},
	dir: {
		public: "../public",
	},
	i18n: {
		baseUrl: env.NUXT_PUBLIC_APP_BASE_URL,
		defaultLocale,
		detectBrowserLanguage: {
			redirectOn: "root",
		},
		langDir: "./messages",
		lazy: true,
		locales: Object.values(locales),
		strategy: "prefix",
	},
	modules: ["@nuxt/content", "@nuxt/image", "@nuxtjs/i18n"],
	nitro: {
		compressPublicAssets: true,
	},
	postcss: {
		plugins: {
			"tailwindcss/nesting": "postcss-nesting",
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	routeRules: {
		"/": { static: true },
		"/imprint": { static: true },
	},
	srcDir: "./src/",
	typescript: {
		shim: false,
		strict: true,
		// https://github.com/nuxt/nuxt/issues/14816#issuecomment-1484918081
		tsConfig: {
			compilerOptions: {
				paths: {
					"@/*": ["./src/*"],
					"~/*": ["./*"],
				},
			},
		},
	},
	vite: {
		esbuild: {
			define: {
				"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
			},
		},
	},
});
