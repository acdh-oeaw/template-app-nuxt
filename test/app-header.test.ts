import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";

import AppHeader from "@/components/app-header.vue";
import en from "@/messages/en.json";

describe("AppHeader", () => {
	it("renders", async () => {
		/** @see https://github.com/nuxt-modules/i18n/issues/2637#issuecomment-1869570676 */
		const i18n = createI18n({
			legacy: false,
			locale: "en",
			messages: {
				en,
			},
		});

		await renderSuspended(AppHeader, {
			global: { plugins: [i18n] },
		});

		expect(screen.getByRole("link", { name: "Home" })).toBeDefined();
	});
});
