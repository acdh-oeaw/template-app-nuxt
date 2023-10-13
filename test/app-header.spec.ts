import { screen } from "@testing-library/vue";
import { renderSuspended } from "nuxt-vitest/utils";
import { describe, expect, it } from "vitest";

import AppHeader from "@/components/app-header.vue";

describe("AppHeader", () => {
	it("renders", async () => {
		await renderSuspended(AppHeader);
		expect(screen.getByRole("link", { name: "Home" })).toBeDefined();
	});
});
