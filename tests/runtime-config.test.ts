import assert from "node:assert/strict";
import { test } from "node:test";

import {
	validatePublicRuntimeConfig,
	validateServerRuntimeConfig,
} from "../shared/config/runtime-config.ts";

function createConfig(overrides: Record<string, unknown> = {}) {
	return {
		app: { baseURL: "/" },
		public: {
			moduleSetting: "preserved",
			app: {
				baseUrl: "https://example.com",
				imprintServiceBaseUrl: "https://imprint.example.com",
				...overrides,
			} as Record<string, unknown>,
		},
	};
}

await test("normalizes build-time string IDs and runtime numeric IDs consistently", () => {
	for (const id of [304, "304", " 304 "]) {
		const raw = createConfig({ matomoId: id, serviceId: id });
		const config = validateServerRuntimeConfig(raw);

		assert.equal(config.public.app.matomoId, "304");
		assert.equal(config.public.app.serviceId, "304");
		assert.equal(raw.public.app.matomoId, id);
		assert.equal(config.app, raw.app);
		assert.equal(config.public.moduleSetting, "preserved");
	}
});

await test("allows analytics to remain disabled with missing or empty optional settings", () => {
	for (const matomoId of [undefined, ""]) {
		const config = validatePublicRuntimeConfig(
			createConfig({ matomoId, bots: "", imprintCustomConfig: "" }),
		);

		assert.equal(config.public.app.matomoId, "");
		assert.equal(config.public.app.matomoBaseUrl, "");
		assert.equal(config.public.app.serviceId, "");
		assert.equal(config.public.app.bots, "disabled");
		assert.equal(config.public.app.imprintCustomConfig, "disabled");
	}
});

await test("rejects invalid application settings and reports their paths without their values", () => {
	for (const [key, value] of [
		["baseUrl", "secret-invalid-url"],
		["imprintServiceBaseUrl", "secret-invalid-url"],
		["matomoBaseUrl", "secret-invalid-url"],
		["matomoId", "secret-invalid-id"],
		["matomoId", 0],
		["matomoId", -1],
		["matomoId", 1.5],
		["serviceId", "secret-invalid-id"],
		["bots", "secret-invalid-option"],
		["imprintCustomConfig", "secret-invalid-option"],
		["googleSiteVerification", false],
	] as const) {
		assert.throws(() => validateServerRuntimeConfig(createConfig({ [key]: value })), {
			message: `Invalid runtime configuration: public.app.${key}`,
		});
	}
});
