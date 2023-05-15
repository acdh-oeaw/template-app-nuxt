import { createUrl } from "@stefanprobst/request";

import { env } from "~/config/env.config";
import { type Locale } from "~/config/i18n.config";

const baseUrl = "https://shared.acdh.oeaw.ac.at";
const pathname = "/acdh-common-assets/api/imprint.php";
const redmineId = env.NUXT_PUBLIC_REDMINE_ID;

export function createImprintUrl(locale: Locale): URL {
	return createUrl({
		baseUrl,
		pathname,
		searchParams: {
			outputLang: locale,
			serviceID: redmineId,
		},
	});
}
