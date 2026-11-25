import { defineEventHandler } from "nuxt/server";
import { createI18n } from "vue-i18n";

import de from "~/i18n/messages/de.json";
import en from "~/i18n/messages/en.json";

const locale = "en";
const messages = { de, en } as const;

const { t } = createI18n({ legacy: false, locale, messages }).global;

const manifest = {
	name: t("Manifest.name"),
	short_name: t("Manifest.short-name"),
	description: t("Manifest.description"),
	start_url: "/",
	display: "standalone",
	background_color: "#fff",
	theme_color: "#fff",
	icons: [
		{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
		{ src: "/icon-maskable.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
		{ src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
		{ src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
	],
};

export default defineEventHandler((event) => {
	if (!event.res.headers.has("content-type")) {
		event.res.headers.set("content-type", "application/manifest+json");
	}
	return manifest;
});
