import * as Sentry from "@sentry/nuxt";

Sentry.init({
	dsn: process.env.NUXT_PUBLIC_SENTRY_DSN,
	enableLogs: true,
	integrations: [Sentry.replayIntegration()],
	replaysOnErrorSampleRate: 1.0,
	replaysSessionSampleRate: 0.1,
	/**
	 * Enable sending personally identifiable information.
	 *
	 * @see {@link https://docs.sentry.io/platforms/javascript/guides/nextjs/data-management/data-collected/}
	 */
	sendDefaultPii: process.env.NUXT_PUBLIC_SENTRY_PII === "enabled",
	tracesSampleRate: 0.1,
});
