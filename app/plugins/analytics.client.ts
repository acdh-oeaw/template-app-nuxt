import { isNonEmptyString } from "@acdh-oeaw/lib";

export default defineNuxtPlugin(() => {
	const env = useRuntimeConfig();
	const { matomoBaseUrl, matomoId } = env.public.app;

	if (
		!isNonEmptyString(matomoBaseUrl) ||
		/** Nuxt tries to type-cast env vars. @see {@link https://github.com/nuxt/nuxt/issues/24812} */
		typeof matomoId !== "number"
	) {
		return;
	}

	/** Provided by `@nuxt/scripts`. */
	const { proxy } = useScriptMatomoAnalytics({
		matomoUrl: matomoBaseUrl,
		siteId: String(matomoId),
		disableCookies: true,
		enableLinkTracking: true,
	});

	proxy._paq.push(["enableHeartBeatTimer"]);
});
