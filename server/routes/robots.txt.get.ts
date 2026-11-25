import { createUrl } from "@acdh-oeaw/lib";
import { defaultContentType, defineEventHandler } from "h3";
import { useRuntimeConfig } from "nuxt/server";

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

	defaultContentType(event, "text/plain");
	return robots;
});
