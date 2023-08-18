import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import AppFooter from "@/components/app-footer.vue";

describe("AppFooter", () => {
	it("is a Vue instance", () => {
		const wrapper = mount(AppFooter);
		expect(wrapper.vm).toBeTruthy();
	});
});
