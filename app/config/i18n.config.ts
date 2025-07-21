import { includes } from "@acdh-oeaw/lib";
import type { LocaleObject } from "vue-i18n-routing";

import type de from "~/i18n/messages/de.json";
import type en from "~/i18n/messages/en.json";

export const locales = ["de", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const files = [
	{ code: "de" as const, language: "de", file: "de.json" },
	{ code: "en" as const, language: "en", file: "en.json" },
] satisfies Array<LocaleObject>;

export type Messages = typeof en;

export interface Schema {
	message: Messages;
}

export function isValidLocale(value: string): value is Locale {
	return includes(locales, value);
}

export interface Translations extends Record<Locale, Messages> {
	de: typeof de;
	en: typeof en;
}
