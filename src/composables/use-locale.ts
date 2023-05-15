import { type Locale, type Schema } from "~/config/i18n.config";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useLocale() {
	const { locale } = useI18n<Schema, Locale>();

	return locale;
}
