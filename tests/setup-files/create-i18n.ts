import { config } from "@vue/test-utils";
import { createI18n } from "vue-i18n";

import * as de from "@/messages/de.json";
import * as en from "@/messages/en.json";

config.global.plugins.push(
	createI18n({
		locale: "en",
		legacy: false,
		messages: {
			de,
			en,
		},
	}),
);
