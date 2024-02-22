import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { createI18n } from "vue-i18n";

import AppFooter from "@/components/app-footer.vue";
import en from "@/messages/en.json";

describe("AppFooter", () => {
	it("renders", async () => {
		/** @see https://github.com/nuxt-modules/i18n/issues/2637#issuecomment-1869570676 */
		const i18n = createI18n({
			legacy: false,
			locale: "en",
			messages: {
				en,
			},
		});

		await renderSuspended(AppFooter, {
			global: { plugins: [i18n] },
		});

		expect(screen.getByRole("link", { name: "Imprint" })).toBeDefined();
	});
});
