import { type Messages } from "~/config/i18n.config";
import { type ResourcePath } from "@intlify/core-base";

declare module "#app" {
	interface PageMeta {
		title: ResourcePath<Messages>;
	}
}
