import { createUrl } from "@acdh-oeaw/lib";
import { defaultContentType, defineEventHandler } from "h3";

import { useValidatedRuntimeConfig } from "~/server/utils/use-validated-runtime-config";

export default defineEventHandler((event) => {
	const { baseUrl, bots } = useValidatedRuntimeConfig(event).public.app;
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
