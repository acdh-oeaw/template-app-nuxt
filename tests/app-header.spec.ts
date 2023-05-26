import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import AppHeader from "@/components/app-header.vue";

describe("AppHeader", () => {
	it("is a Vue instance", () => {
		const wrapper = mount(AppHeader);
		expect(wrapper.vm).toBeTruthy();
	});
});
