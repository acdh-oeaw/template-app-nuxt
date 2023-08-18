import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import MainContent from "@/components/main-content.vue";

describe("MainContent", () => {
	it("is a Vue instance", () => {
		const wrapper = mount(MainContent);
		expect(wrapper.vm).toBeTruthy();
	});
});
