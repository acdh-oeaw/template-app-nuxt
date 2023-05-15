import { createEnv } from "@t3-oss/env-nuxt";
import { z } from "zod";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BOTS?: string | undefined;
			ENV_VALIDATION?: string | undefined;
			NODE_ENV?: string | undefined;
			NUXT_PUBLIC_APP_BASE_URL?: string | undefined;
			NUXT_PUBLIC_MATOMO_BASE_URL?: string | undefined;
			NUXT_PUBLIC_MATOMO_ID?: string | undefined;
			NUXT_PUBLIC_REDMINE_ID?: string | undefined;
		}
	}
}

/**
 * FIXME:
 * @see https://github.com/t3-oss/t3-env/issues/59
 */

export const env = createEnv({
	server: {
		BOTS: z.enum(["disabled", "enabled"]).optional(),
		ENV_VALIDATION: z.enum(["disabled", "enabled"]).optional(),
		NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
	},
	client: {
		NUXT_PUBLIC_APP_BASE_URL: z.string().url(),
		NUXT_PUBLIC_MATOMO_BASE_URL: z.string().url().optional(),
		NUXT_PUBLIC_MATOMO_ID: z.string().min(1).optional(),
		NUXT_PUBLIC_REDMINE_ID: z.coerce.number().min(1),
	},
	// runtimeEnv: {
	// 	BOTS: process.env.BOTS,
	// 	ENV_VALIDATION: process.env.ENV_VALIDATION,
	// 	NODE_ENV: process.env.NODE_ENV,
	// 	NUXT_PUBLIC_APP_BASE_URL: process.env.NUXT_PUBLIC_APP_BASE_URL,
	// 	NUXT_PUBLIC_MATOMO_BASE_URL: process.env.NUXT_PUBLIC_MATOMO_BASE_URL,
	// 	NUXT_PUBLIC_MATOMO_ID: process.env.NUXT_PUBLIC_MATOMO_ID,
	// 	NUXT_PUBLIC_REDMINE_ID: process.env.NUXT_PUBLIC_REDMINE_ID,
	// },
	skipValidation: process.env.ENV_VALIDATION === "disabled",
});
