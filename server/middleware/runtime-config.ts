import { defineEventHandler } from "h3";

import { useValidatedRuntimeConfig } from "~/server/utils/use-validated-runtime-config";

export default defineEventHandler((event) => {
	useValidatedRuntimeConfig(event);
});
