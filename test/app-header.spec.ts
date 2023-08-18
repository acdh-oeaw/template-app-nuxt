import { mountSuspended } from "nuxt-vitest/utils";
import { describe, expect, it } from "vitest";

import AppHeader from "@/components/app-header.vue";

describe("AppHeader", () => {
	it("is a Vue instance", async () => {
		const wrapper = await mountSuspended(AppHeader);
		expect(wrapper.vm).toBeTruthy();
	});
});
