import { glob } from "node:fs/promises";
import { join } from "node:path";

import { createUrl } from "@acdh-oeaw/lib";
import { defineEventHandler, useRuntimeConfig } from "nuxt/server";

import { locales } from "@/config/i18n.config";

async function getRoutes() {
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

	return routes;
}

let routesPromise: ReturnType<typeof getRoutes> | undefined;

export default defineEventHandler(async (event) => {
	const routes = await (routesPromise ??= getRoutes().catch((error: unknown) => {
		routesPromise = undefined;
		throw error;
	}));
	const { baseUrl } = useRuntimeConfig().public.app;
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

	if (!event.res.headers.has("content-type")) {
		event.res.headers.set("content-type", "application/xml");
	}
	return sitemap;
});
