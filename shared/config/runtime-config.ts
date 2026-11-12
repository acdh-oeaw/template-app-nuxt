import * as v from "valibot";

const urlSchema = v.pipe(v.string(), v.url());
const optionalUrlSchema = v.optional(v.union([v.literal(""), urlSchema]), "");
const optionalToggleSchema = v.optional(
	v.pipe(
		v.union([v.literal(""), v.picklist(["disabled", "enabled"])]),
		v.transform((value) => (value === "" ? "disabled" : value)),
	),
	"disabled",
);
const optionalIdSchema = v.optional(
	v.pipe(
		v.union([v.string(), v.number()]),
		v.transform(String),
		v.trim(),
		v.regex(/^(?:[1-9]\d*)?$/),
	),
	"",
);

export const publicRuntimeConfigSchema = v.object({
	app: v.object({
		baseUrl: urlSchema,
		bots: optionalToggleSchema,
		googleSiteVerification: v.optional(v.string(), ""),
		imprintCustomConfig: optionalToggleSchema,
		imprintServiceBaseUrl: urlSchema,
		matomoBaseUrl: optionalUrlSchema,
		matomoId: optionalIdSchema,
		serviceId: optionalIdSchema,
	}),
});

/** Add application-owned server-only settings here. Nuxt's own settings are preserved separately. */
export const privateRuntimeConfigSchema = v.object({});

function parseConfig<TSchema extends v.GenericSchema>(
	schema: TSchema,
	input: unknown,
	prefix = "",
): v.InferOutput<TSchema> {
	const result = v.safeParse(schema, input);

	if (!result.success) {
		const paths = [
			...new Set(result.issues.map((issue) => `${prefix}${v.getDotPath(issue) ?? ""}`)),
		];
		/** Report invalid keys without exposing configuration values, which may contain secrets. */
		throw new Error(`Invalid runtime configuration: ${paths.join(", ")}`);
	}

	return result.output;
}

export function validatePublicRuntimeConfig<TConfig extends { public: Record<string, unknown> }>(
	config: TConfig,
) {
	return {
		...config,
		public: {
			...config.public,
			...parseConfig(publicRuntimeConfigSchema, config.public, "public."),
		},
	};
}

export function validateServerRuntimeConfig<TConfig extends { public: Record<string, unknown> }>(
	config: TConfig,
) {
	return {
		...validatePublicRuntimeConfig(config),
		...parseConfig(privateRuntimeConfigSchema, config),
	};
}
