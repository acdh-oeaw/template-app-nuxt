type JsonValue = Array<JsonValue> | boolean | number | string | { [key: string]: JsonValue } | null;

const entities = Object.freeze({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&apos;",
});

const regex = new RegExp(`[${Object.keys(entities).join("")}]`, "g");

function replacer(t: string): string {
	return entities[t as keyof typeof entities];
}

export function escape(value: string) {
	return value.replace(regex, replacer);
}

/**
 * A replacer for JSON.stringify to strip JSON-LD of illegal HTML entities.
 *
 * @see {@link https://www.w3.org/TR/json-ld11/#restrictions-for-contents-of-json-ld-script-elements}
 * @see {@link https://github.com/google/react-schemaorg/blob/main/src/json-ld.tsx}
 */
export function safeJsonLdReplacer(_key: string, value: JsonValue): JsonValue | undefined {
	// eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
	switch (typeof value) {
		case "object": {
			if (value === null) return undefined;
			return value;
		}

		case "bigint":
		case "boolean":
		case "number": {
			return value;
		}

		case "string": {
			return escape(value);
		}

		default: {
			return undefined;
		}
	}
}
