import { definePlugin } from "nitro";
import pino from "pino";

const logger = pino();

function serializeRequest(request: Request) {
	const url = new URL(request.url);

	return { method: request.method, url: url.pathname + url.search };
}

function getStatusCode(error: Error): number {
	const status = "status" in error ? error.status : undefined;

	return typeof status === "number" ? status : 500;
}

/**
 * Logs requests and errors with Nitro runtime hooks, which only rely on web `Request` and
 * `Response` objects, and therefore work on every runtime.
 */
export default definePlugin((nitroApp) => {
	if (process.env.NODE_ENV !== "production") {
		return;
	}

	const startTimes = new WeakMap<object, number>();

	nitroApp.hooks.hook("request", (event) => {
		startTimes.set(event, performance.now());
	});

	nitroApp.hooks.hook("response", (response, event) => {
		const startTime = startTimes.get(event);

		logger.info({
			req: serializeRequest(event.req),
			res: { statusCode: response.status },
			responseTime: startTime == null ? undefined : Math.round(performance.now() - startTime),
		});
	});

	nitroApp.hooks.hook("error", (error, { event }) => {
		/** Client errors, e.g. 404s, are already logged as responses. */
		if (getStatusCode(error) < 500) {
			return;
		}

		logger.error({
			err: error,
			req: event == null ? undefined : serializeRequest(event.req),
		});
	});
});
