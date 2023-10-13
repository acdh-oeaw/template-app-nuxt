import { config } from "@vue/test-utils";
import { createI18n } from "vue-i18n";

import { defaultLocale } from "@/config/i18n.config";
import de from "@/messages/de.json";
import en from "@/messages/en.json";

config.global.plugins.push(
	createI18n({
		legacy: false,
		locale: defaultLocale,
		messages: {
			de,
			en,
		},
	}),
);
