<script lang="ts" setup>
import { createUrl, isNonEmptyString } from "@acdh-oeaw/lib";
import inter from "@fontsource-variable/inter/files/inter-latin-slnt-normal.woff2?url";
import type { WebSite, WithContext } from "schema-dts";

const env = useRuntimeConfig();

const locale = useLocale();
const t = useTranslations();

const router = useRouter();

const i18nHead = useLocaleHead({
	addDirAttribute: true,
	identifierAttribute: "id",
	addSeoAttributes: true,
});

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
			{ href: "/favicon.ico", rel: "icon", sizes: "any" },
			{ href: "/icon.svg", rel: "icon", type: "image/svg+xml", sizes: "any" },
			{ href: "/apple-icon.png", rel: "apple-touch-icon" },
			{ href: "/manifest.webmanifest", rel: "manifest" },
			{ href: inter, rel: "preload", as: "font", type: "font/woff2", crossorigin: true },
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
						baseUrl: env.public.appBaseUrl,
						pathname: "/opengraph-image.png",
					}),
				),
			},
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:creator", content: t("DefaultLayout.meta.twitter") },
			{ name: "twitter:site", content: t("DefaultLayout.meta.twitter") },
			...(i18nHead.value.meta ?? []),
		];

		if (isNonEmptyString(env.public.googleSiteVerification)) {
			meta.push({ name: "google-site-verification", content: env.public.googleSiteVerification });
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

		if (isNonEmptyString(env.public.matomoBaseUrl) && isNonEmptyString(env.public.matomoId)) {
			const baseUrl = env.public.matomoBaseUrl;

			scripts.push({
				type: "",
				innerHTML: createAnalyticsScript(
					baseUrl.endsWith("/") ? baseUrl : baseUrl + "/",
					env.public.matomoId,
				),
			});
		}

		return scripts;
	}),
});

router.afterEach((to, from) => {
	trackPageView(to, from);
});
</script>

<template>
	<div class="grid min-h-full grid-rows-[auto_1fr_auto]">
		<SkipLink target-id="main-content">{{ t("DefaultLayout.skip-to-main-content") }}</SkipLink>

		<AppHeader />
		<ErrorBoundary>
			<slot />
		</ErrorBoundary>
		<AppFooter />
	</div>
</template>
