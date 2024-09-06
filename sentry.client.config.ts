import * as Sentry from "@sentry/nuxt";

Sentry.init({
	debug: false,
	dsn: process.env.NUXT_PUBLIC_SENTRY_DSN,
	/**
	 * Consider lowering this is production.
	 */
	tracesSampleRate: 1.0,
});
