import { glob } from "node:fs/promises";
import { join } from "node:path";

import { createUrl } from "@acdh-oeaw/lib";
import { defaultContentType, defineEventHandler, defineLazyEventHandler } from "h3";

import { locales } from "@/config/i18n.config";
import { useValidatedRuntimeConfig } from "~/server/utils/use-validated-runtime-config";

export default defineLazyEventHandler(async () => {
	const routes: Array<string> = [];

	for await (const path of glob("./**/*.vue", {
		cwd: join(process.cwd(), "app", "pages"),
	})) {
		const _route = path.slice(0, -".vue".length).replace(/\/?index$/, "");
		const route = _route.length === 0 ? _route : `/${_route}`;

		const segments = [];

		for (const segment of route.split("/")) {
			/** Dynamic routes. */
			if (segment.startsWith("[") && segment.endsWith("]")) {
				break;
			}

			/** Route groups. */
			if (segment.startsWith("(") && segment.endsWith(")")) {
				continue;
			}

			segments.push(segment);
		}

		routes.push(segments.join("/"));
	}

	return defineEventHandler((event) => {
		const { baseUrl } = useValidatedRuntimeConfig(event).public.app;
		const entries: Array<{ url: string; lastModified?: Date }> = locales.flatMap((locale) => {
			return routes.map((pathname) => {
				return {
					url: String(createUrl({ baseUrl, pathname: `/${locale}${pathname}` })),
				};
			});
		});

		const sitemap = [
			'<?xml version="1.0" encoding="UTF-8"?>',
			'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
			...entries.flatMap((entry) => {
				const elements = ["<url>", `<loc>${entry.url}</loc>`];
				if (entry.lastModified != null) {
					elements.push(`<lastmod>${entry.lastModified.toISOString()}</lastmod>`);
				}
				elements.push("</url>");
				return elements;
			}),
			"</urlset>",
		].join("\n");

		defaultContentType(event, "application/xml");
		return sitemap;
	});
});
