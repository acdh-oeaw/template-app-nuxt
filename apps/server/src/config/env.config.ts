import { log } from "@acdh-oeaw/lib";
import * as v from "valibot";

const schema = v.object({
	port: v.optional(
		v.pipe(v.unknown(), v.transform(Number), v.number(), v.integer(), v.minValue(3001)),
		5000,
	),
});

const result = v.safeParse(schema, process.env);

if (!result.success) {
	const message = "Invalid environment variables";

	log.error(`${message}:`, v.flatten(result.issues).nested);

	const validationError = new Error(message);
	delete validationError.stack;

	throw validationError;
}

export const env = result.output;
