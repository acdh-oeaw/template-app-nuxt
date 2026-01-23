import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";

import { defaultLocale, files } from "./app/config/i18n.config";

const baseUrl = process.env.NUXT_PUBLIC_APP_BASE_URL!;

export default defineNuxtConfig({
	alias: {
		"@": fileURLToPath(new URL("./app/", import.meta.url)),
		"~": fileURLToPath(new URL("./", import.meta.url)),
	},
	app: {
		layoutTransition: false,
		pageTransition: false,
	},
	colorMode: {
		classSuffix: "",
		dataValue: "ui-color-scheme",
	},
	compatibilityDate: "2026-01-01",
	components: [{ extensions: [".vue"], path: "components", pathPrefix: false }],
	css: [
		"@fontsource-variable/inter/standard.css",
		"@fontsource-variable/inter/standard-italic.css",
		"@/styles/index.css",
	],
	devtools: {
		enabled: true,
	},
	eslint: {
		config: {
			autoInit: false,
			standalone: false,
		},
	},
	experimental: {
		defaults: {
			useAsyncData: {
				deep: false,
			},
			useFetch: {
				timeout: 250,
			},
		},
		inlineRouteRules: true,
	},
	future: {
		compatibilityVersion: 5,
	},
	i18n: {
		baseUrl,
		defaultLocale,
		detectBrowserLanguage: {
			redirectOn: "root",
		},
		experimental: {
			typedOptionsAndMessages: "default",
		},
		langDir: "messages",
		locales: files,
		strategy: "prefix",
	},
	imports: {
		dirs: ["@/config/"],
	},
	modules: [
		"@nuxt/eslint",
		"@nuxt/fonts",
		"@nuxt/hints",
		"@nuxt/icon",
		"@nuxt/image",
		"@nuxt/scripts",
		"@nuxt/test-utils",
		"@nuxtjs/color-mode",
		"@nuxtjs/i18n",
		"@vueuse/nuxt",
	],
	nitro: {
		compressPublicAssets: true,
		prerender: {
			routes: ["/manifest.webmanifest", "/robots.txt", "/sitemap.xml"],
		},
	},
	runtimeConfig: {
		public: {
			app: {
				baseUrl: process.env.NUXT_PUBLIC_APP_BASE_URL,
				bots: process.env.NUXT_PUBLIC_APP_BOTS,
				googleSiteVerification: process.env.NUXT_PUBLIC_APP_GOOGLE_SITE_VERIFICATION,
				imprintCustomConfig: process.env.NUXT_PUBLIC_APP_IMPRINT_CUSTOM_CONFIG,
				imprintServiceBaseUrl: process.env.NUXT_PUBLIC_APP_IMPRINT_SERVICE_BASE_URL,
				matomoBaseUrl: process.env.NUXT_PUBLIC_APP_MATOMO_BASE_URL,
				matomoId: process.env.NUXT_PUBLIC_APP_MATOMO_ID,
				serviceId: process.env.NUXT_PUBLIC_APP_SERVICE_ID,
			},
		},
	},
	typescript: {
		shim: false,
		strict: true,
		// https://github.com/nuxt/nuxt/issues/14816#issuecomment-1484918081
		tsConfig: {
			compilerOptions: {
				baseUrl: ".",
				paths: {
					"@/*": ["./app/*"],
					"~/*": ["./*"],
				},
			},
			include: [
				"../*.config.ts",
				"../i18n/*.config.ts",
				"../e2e/**/*.ts",
				"../scripts/**/*.ts",
				"../server/**/*.ts",
			],
		},
	},
	vite: {
		build: {
			cssMinify: "lightningcss",
		},
		plugins: [tailwindcss()],
	},
});
