import { defaultLocale } from "#client/config/i18n.config";

export default defineI18nConfig(() => {
	return {
		fallbackLocale: defaultLocale,
		legacy: false,
	};
});
