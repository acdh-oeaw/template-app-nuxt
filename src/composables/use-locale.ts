import { type Locale, type Schema } from "@/config/i18n.config";

export function useLocale() {
	const { locale } = useI18n<Schema, Locale>();

	return locale;
}
