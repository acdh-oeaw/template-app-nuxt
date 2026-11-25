import { createUrl } from "@acdh-oeaw/lib";
import { defineEventHandler, useRuntimeConfig } from "nuxt/server";

export default defineEventHandler((event) => {
	const { baseUrl, bots } = useRuntimeConfig().public.app;
	const isIndexable = bots === "enabled";

	const config = isIndexable
		? {
				"User-Agent": "*",
				Allow: "/",
				Host: baseUrl,
				Sitemap: String(createUrl({ baseUrl, pathname: "sitemap.xml" })),
			}
		: {
				"User-Agent": "*",
				Disallow: "/",
				Host: baseUrl,
			};

	const robots = Object.entries(config)
		.map(([key, value]) => {
			return `${key}: ${String(value)}`;
		})
		.join("\n");

	if (!event.res.headers.has("content-type")) {
		event.res.headers.set("content-type", "text/plain");
	}
	return robots;
});
