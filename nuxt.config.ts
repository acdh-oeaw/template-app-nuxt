import { fileURLToPath } from "node:url";

import { defaultLocale, locales } from "./config/i18n.config";

export default defineNuxtConfig({
	alias: {
		"@": fileURLToPath(new URL("./", import.meta.url)),
	},
	colorMode: {
		classSuffix: "",
		dataValue: "color-scheme",
	},
	components: [{ path: "@/components", pathPrefix: false }],
	content: {
		defaultLocale,
		locales: Object.keys(locales),
		markdown: {},
	},
	css: ["@fontsource-variable/inter/slnt.css", "tailwindcss/tailwind.css", "@/styles/index.css"],
	devtools: {
		enabled: true,
	},
	experimental: {
		componentIslands: true,
	},
	i18n: {
		baseUrl: process.env.NUXT_PUBLIC_APP_BASE_URL,
		defaultLocale,
		detectBrowserLanguage: {
			redirectOn: "root",
		},
		langDir: "./messages",
		lazy: true,
		locales: Object.values(locales),
		strategy: "prefix_except_default",
	},
	modules: ["@nuxt/content", "@nuxt/image", "@nuxtjs/color-mode", "@nuxtjs/i18n", "nuxt-vitest"],
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
	runtimeConfig: {
		BOTS: process.env.BOTS,
		ENV_VALIDATION: process.env.ENV_VALIDATION,
		NODE_ENV: process.env.NODE_ENV,
		public: {
			NUXT_PUBLIC_APP_BASE_URL: process.env.NUXT_PUBLIC_APP_BASE_URL,
			NUXT_PUBLIC_MATOMO_BASE_URL: process.env.NUXT_PUBLIC_MATOMO_BASE_URL,
			NUXT_PUBLIC_MATOMO_ID: process.env.NUXT_PUBLIC_MATOMO_ID,
			NUXT_PUBLIC_REDMINE_ID: process.env.NUXT_PUBLIC_REDMINE_ID,
		},
	},
	typescript: {
		shim: false,
		strict: true,
		// https://github.com/nuxt/nuxt/issues/14816#issuecomment-1484918081
		tsConfig: {
			compilerOptions: {
				paths: {
					"@/*": ["./*"],
				},
			},
		},
	},
});
