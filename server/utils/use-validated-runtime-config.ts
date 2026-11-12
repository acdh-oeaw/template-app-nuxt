import type { H3Event } from "h3";
import { useRuntimeConfig } from "nitropack/runtime";

import { validateServerRuntimeConfig } from "~/shared/config/runtime-config";

type ValidatedRuntimeConfig = ReturnType<
	typeof validateServerRuntimeConfig<ReturnType<typeof useRuntimeConfig>>
>;

declare module "h3" {
	interface H3EventContext {
		validatedRuntimeConfig?: ValidatedRuntimeConfig;
	}
}

export function useValidatedRuntimeConfig(event: H3Event): ValidatedRuntimeConfig {
	return (event.context.validatedRuntimeConfig ??= validateServerRuntimeConfig(
		useRuntimeConfig(event),
	));
}
