<script lang="ts" setup>
import { addTrailingSlash, createUrl, isNonEmptyString, removeTrailingSlash } from "@acdh-oeaw/lib";
import inter from "@fontsource-variable/inter/files/inter-latin-standard-normal.woff2?url";
import type { WebSite, WithContext } from "schema-dts";

const env = useRuntimeConfig();

const locale = useLocale();
const t = useTranslations();

const basePath = removeTrailingSlash(env.app.baseURL);

function withBasePath(pathname: string) {
	if (basePath.length !== 0) {
		return `${basePath}${pathname}`;
	}

	return pathname;
}

const i18nHead = useLocaleHead();

useHead({
	htmlAttrs: {
		lang: computed(() => {
			return locale.value;
		}),
	},
	titleTemplate: computed(() => {
		return ["%s", t("DefaultLayout.meta.title")].join(" | ");
	}),
	title: computed(() => {
		return t("DefaultLayout.meta.title");
	}),
	link: computed(() => {
		return [
			{ href: withBasePath("/favicon.ico"), rel: "icon", sizes: "any" },
			{ href: withBasePath("/icon.svg"), rel: "icon", type: "image/svg+xml", sizes: "any" },
			{ href: withBasePath("/apple-icon.png"), rel: "apple-touch-icon" },
			{ href: withBasePath("/manifest.webmanifest"), rel: "manifest" },
			{ href: inter, rel: "preload", as: "font", type: "font/woff2", crossorigin: "anonymous" },
			...(i18nHead.value.link ?? []),
		];
	}),
	meta: computed(() => {
		const meta = [
			{ name: "description", content: t("DefaultLayout.meta.description") },
			{ property: "og:type", content: "website" },
			{ property: "og:title", content: t("DefaultLayout.meta.title") },
			{ property: "og:site_name", content: t("DefaultLayout.meta.title") },
			{ property: "og:description", content: t("DefaultLayout.meta.description") },
			{
				property: "og:image",
				content: String(
					createUrl({
						baseUrl: env.public.app.baseUrl,
						pathname: withBasePath("/opengraph-image.png"),
					}),
				),
			},
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:creator", content: t("DefaultLayout.meta.twitter") },
			{ name: "twitter:site", content: t("DefaultLayout.meta.twitter") },
			...(i18nHead.value.meta ?? []),
		];

		if (isNonEmptyString(env.public.app.googleSiteVerification)) {
			meta.push({
				name: "google-site-verification",
				content: env.public.app.googleSiteVerification,
			});
		}

		return meta;
	}),
	script: computed(() => {
		const jsonLd: WithContext<WebSite> = {
			"@context": "https://schema.org",
			"@type": "WebSite",
			name: t("DefaultLayout.meta.title"),
			description: t("DefaultLayout.meta.description"),
		};

		const scripts = [
			{ type: "application/ld+json", innerHTML: JSON.stringify(jsonLd, safeJsonLdReplacer) },
		];

		if (
			isNonEmptyString(env.public.app.matomoBaseUrl) &&
			(isNonEmptyString(env.public.app.matomoId) ||
				/** Nuxt tries to cast env vars. @see {@link https://github.com/nuxt/nuxt/issues/24812} */
				typeof env.public.app.matomoId === "number")
		) {
			const baseUrl = env.public.app.matomoBaseUrl;

			scripts.push({
				type: "text/javascript",
				innerHTML: createAnalyticsScript(addTrailingSlash(baseUrl), env.public.app.matomoId),
			});
		}

		return scripts;
	}),
});
</script>

<template>
	<div class="grid min-h-full grid-rows-[auto_1fr_auto]">
		<SkipLink target-id="main-content">
			{{ t("DefaultLayout.skip-to-main-content") }}
		</SkipLink>

		<AppHeader />
		<ErrorBoundary>
			<slot />
		</ErrorBoundary>
		<AppFooter />
	</div>
</template>
