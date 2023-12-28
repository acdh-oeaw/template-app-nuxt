<script lang="ts" setup>
import { createUrl, isNonEmptyString } from "@acdh-oeaw/lib";
import type { WebSite, WithContext } from "schema-dts";

const env = useRuntimeConfig();

const locale = useLocale();
const t = useTranslations();
const route = useRoute();

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
		return t(route.meta.title);
	}),
	link: computed(() => {
		return [
			{ href: "/favicon.ico", rel: "icon", sizes: "any" },
			{ href: "/icon.svg", rel: "icon", type: "image/svg+xml", sizes: "any" },
			{ href: "/apple-icon.png", rel: "apple-touch-icon" },
			...(i18nHead.value.link ?? []),
		];
	}),
	meta: computed(() => {
		return [
			{ name: "description", content: t("DefaultLayout.meta.description") },
			{ property: "og:type", content: "website" },
			{ property: "og:title", content: t(route.meta.title) },
			{ property: "og:site_name", content: t("DefaultLayout.meta.title") },
			{ property: "og:description", content: t("DefaultLayout.meta.description") },
			{
				property: "og:image",
				content: String(
					createUrl({
						baseUrl: env.public.NUXT_PUBLIC_APP_BASE_URL,
						pathname: "/opengraph-image.png",
					}),
				),
			},
			{ property: "og:locale", content: locale.value },
			...(i18nHead.value.meta ?? []),
		];
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
			isNonEmptyString(env.public.NUXT_PUBLIC_MATOMO_BASE_URL) &&
			isNonEmptyString(env.public.NUXT_PUBLIC_MATOMO_ID)
		) {
			scripts.push({
				type: "",
				innerHTML: createAnalyticsScript(
					env.public.NUXT_PUBLIC_MATOMO_BASE_URL,
					env.public.NUXT_PUBLIC_MATOMO_ID,
				),
			});
		}

		return scripts;
	}),
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

		<RouteAnnouncer />
	</div>
</template>
