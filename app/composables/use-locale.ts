import type { Locale, Schema } from "#client/config/i18n.config";

export function useLocale() {
	const { locale } = useI18n<Schema, Locale>();

	return locale;
}
