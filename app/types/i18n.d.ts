import type { Messages } from "#client/config/i18n.config";

declare module "vue-i18n" {
	export interface DefineLocaleMessage extends Messages {}
}
