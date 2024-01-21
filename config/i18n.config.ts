import type { LocaleObject } from "vue-i18n-routing";

import type de from "@/messages/de.json";
import type en from "@/messages/en.json";

export const locales = ["de", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localesMap = {
	de: { code: "de", iso: "de", file: "de.json" },
	en: { code: "en", iso: "en", file: "en.json" },
} satisfies Record<Locale, LocaleObject>;

export type Messages = typeof en;

export interface Schema {
	message: Messages;
}

export function isValidLocale(value: string): value is Locale {
	return value in localesMap;
}

export interface Translations extends Record<Locale, Messages> {
	de: typeof de;
	en: typeof en;
}
