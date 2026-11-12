import { assert } from "@acdh-oeaw/lib";

import { validatePublicRuntimeConfig } from "~/shared/config/runtime-config";

export default defineNuxtPlugin({
	name: "validated-runtime-config",
	enforce: "pre",
	setup() {
		const config = import.meta.server
			? useRequestEvent()?.context.validatedRuntimeConfig
			: validatePublicRuntimeConfig(useRuntimeConfig());

		assert(config != null, "Missing validated runtime configuration.");

		return {
			provide: { validatedRuntimeConfig: config },
		};
	},
});
