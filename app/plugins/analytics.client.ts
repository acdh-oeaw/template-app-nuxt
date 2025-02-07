import type { Router } from "vue-router";

export default defineNuxtPlugin((nuxtApp) => {
	const router = nuxtApp.$router as Router;

	/**
	 * We are *not* dispatching an initial `trackPageView` event in the matomo
	 * init script, so we need to do it here.
	 */
	void router.isReady().then(() => {
		trackPageView(router.currentRoute.value, undefined);
	});

	router.afterEach((to, from) => {
		trackPageView(to, from);
	});
});
