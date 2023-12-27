import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";

import AppFooter from "@/components/app-footer.vue";

describe("AppFooter", () => {
	it("renders", async () => {
		await renderSuspended(AppFooter);
		expect(screen.getByRole("link", { name: "Imprint" })).toBeDefined();
	});
});
