import { createI18n } from "vue-i18n";

import en from "~/i18n/messages/en.json";

const locale = "en";

const { t } = createI18n({ legacy: false, locale, messages: { [locale]: en } }).global;

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
	defaultContentType(event, "application/manifest+json");
	return manifest;
});
