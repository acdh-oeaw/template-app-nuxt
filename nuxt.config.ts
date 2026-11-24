import { fileURLToPath } from "node:url";

import { assert, isNonEmptyString } from "@acdh-oeaw/lib";
import tailwindcss from "@tailwindcss/vite";
import { toStandardJsonSchema } from "@valibot/to-json-schema";
import * as v from "valibot";

import { defaultLocale, files, locales } from "./app/config/i18n.config.ts";
import oxlintGlobals from "./modules/oxlint-globals.ts";

const baseUrl = process.env.NUXT_PUBLIC_APP_BASE_URL;

assert(
	isNonEmptyString(baseUrl),
	"Missing `NUXT_PUBLIC_APP_BASE_URL` environment variable.\nYou may have forgotten to `cp .env.local.example .env.local`.",
);

/**
 * Runtime config schemas, validated by Nuxt at build time and on server start.
 *
 * Environment variables present at build time are embedded as defaults, and can be overridden at
 * runtime with the same `NUXT_PUBLIC_APP_*` environment variables. Settings without a default are
 * required.
 *
 * Note that Nuxt validates against the JSON Schema representation, i.e. types, enums, and required
 * keys; string formats and patterns are documentation only.
 *
 * @see https://nuxt.com/docs/4.x/guide/going-further/runtime-config
 */
function schema<TSchema extends v.GenericSchema>(schema: TSchema, defaultValue?: string) {
	if (defaultValue == null) {
		return toStandardJsonSchema(schema);
	}

	/** Build-time environment variables are validated by Nuxt, like runtime ones. */
	return toStandardJsonSchema(v.optional(schema, defaultValue as v.InferInput<TSchema>));
}

const env = process.env;

const urlSchema = v.pipe(v.string(), v.url());
const optionalUrlSchema = v.union([v.literal(""), urlSchema]);
const toggleSchema = v.picklist(["disabled", "enabled"]);
const optionalIdSchema = v.pipe(v.string(), v.regex(/^(?:[1-9]\d*)?$/));

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
	compatibilityDate: "2026-05-01",
	components: [{ extensions: [".vue"], path: "components", pathPrefix: false }],
	css: [
		"@fontsource-variable/inter/standard.css",
		"@fontsource-variable/inter/standard-italic.css",
		"@/styles/index.css",
	],
	devtools: {
		enabled: true,
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
		oxlintGlobals,
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
		imports: {
			/**
			 * Nuxt 5 disables Nitro's default imports, but @nuxtjs/i18n still uses this export.
			 *
			 * @see https://github.com/nuxt-modules/i18n/issues/4175
			 */
			imports: [{ name: "useRuntimeConfig", from: "nuxt/server" }],
		},
		prerender: {
			routes: [
				"/manifest.webmanifest",
				"/robots.txt",
				"/sitemap.xml",
				...locales.map((locale) => `/${locale}/opengraph-image.png`),
			],
		},
	},
	runtimeConfig: {
		public: {
			app: {
				baseUrl: schema(urlSchema, env.NUXT_PUBLIC_APP_BASE_URL),
				bots: schema(toggleSchema, env.NUXT_PUBLIC_APP_BOTS || "disabled"),
				googleSiteVerification: schema(
					v.string(),
					env.NUXT_PUBLIC_APP_GOOGLE_SITE_VERIFICATION ?? "",
				),
				imprintCustomConfig: schema(
					toggleSchema,
					env.NUXT_PUBLIC_APP_IMPRINT_CUSTOM_CONFIG || "disabled",
				),
				imprintServiceBaseUrl: schema(
					urlSchema,
					env.NUXT_PUBLIC_APP_IMPRINT_SERVICE_BASE_URL || undefined,
				),
				matomoBaseUrl: schema(optionalUrlSchema, env.NUXT_PUBLIC_APP_MATOMO_BASE_URL ?? ""),
				matomoId: schema(optionalIdSchema, env.NUXT_PUBLIC_APP_MATOMO_ID ?? ""),
				serviceId: schema(optionalIdSchema, env.NUXT_PUBLIC_APP_SERVICE_ID ?? ""),
			},
		},
	},
	typescript: {
		shim: false,
		strict: true,
		// https://github.com/nuxt/nuxt/issues/14816#issuecomment-1484918081
		tsConfig: {
			compilerOptions: {
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
				"../tests/**/*.ts",
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
