import { mountSuspended } from "nuxt-vitest/utils";
import { describe, expect, it } from "vitest";

import AppFooter from "@/components/app-footer.vue";

describe("AppFooter", () => {
	it("is a Vue instance", async () => {
		const wrapper = await mountSuspended(AppFooter);
		expect(wrapper.vm).toBeTruthy();
	});
});
