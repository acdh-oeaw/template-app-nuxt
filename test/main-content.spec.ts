import { mountSuspended } from "nuxt-vitest/utils";
import { describe, expect, it } from "vitest";

import MainContent from "@/components/main-content.vue";

describe("MainContent", () => {
	it("is a Vue instance", async () => {
		const wrapper = await mountSuspended(MainContent);
		expect(wrapper.vm).toBeTruthy();
	});
});
