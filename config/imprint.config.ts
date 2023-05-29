import { createUrl, createUrlSearchParams } from "@acdh-oeaw/lib";

import { env } from "~/config/env.config";
import { type Locale } from "~/config/i18n.config";

const baseUrl = "https://shared.acdh.oeaw.ac.at";
const pathname = "/acdh-common-assets/api/imprint.php";
const redmineId = env.NUXT_PUBLIC_REDMINE_ID;

export function createImprintUrl(locale: Locale): URL {
	return createUrl({
		baseUrl,
		pathname,
		searchParams: createUrlSearchParams({
			outputLang: locale,
			serviceID: redmineId,
		}),
	});
}
