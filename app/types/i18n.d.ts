import type { Locale, Messages } from "@/config/i18n.config";

declare module "@intlify/core" {
	interface IntlifyGeneratedTypeConfig {
		locale: Locale;
	}
}

declare module "vue-i18n" {
	export interface DefineLocaleMessage extends Messages {}
}
