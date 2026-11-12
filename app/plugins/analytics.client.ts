import { isNonEmptyString } from "@acdh-oeaw/lib";

export default defineNuxtPlugin({
	dependsOn: ["validated-runtime-config"],
	setup() {
		const env = useValidatedRuntimeConfig();
		const { matomoBaseUrl, matomoId } = env.public.app;

		if (!isNonEmptyString(matomoBaseUrl) || !isNonEmptyString(matomoId)) {
			return;
		}

		/** Provided by `@nuxt/scripts`. */
		const { proxy } = useScriptMatomoAnalytics({
			matomoUrl: matomoBaseUrl,
			siteId: matomoId,
			disableCookies: true,
			enableLinkTracking: true,
		});

		proxy._paq.push(["enableHeartBeatTimer"]);
	},
});
