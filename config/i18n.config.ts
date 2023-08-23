import { type LocaleObject } from "vue-i18n-routing";

import type messages from "@/messages/en.json";

export const locales = {
	de: { code: "de", iso: "de-AT", file: "de.json" },
	en: { code: "en", iso: "en-GB", file: "en.json" },
} satisfies Record<string, LocaleObject>;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = "en";

export type Messages = typeof messages;

export interface Schema {
	message: Messages;
}
