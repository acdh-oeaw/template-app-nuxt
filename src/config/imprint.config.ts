import { createUrl, createUrlSearchParams } from "@acdh-oeaw/lib";

import { type Locale } from "@/config/i18n.config";

const baseUrl = "https://shared.acdh.oeaw.ac.at";
const pathname = "/acdh-common-assets/api/imprint.php";

export function createImprintUrl(locale: Locale, redmineId: string): URL {
	return createUrl({
		baseUrl,
		pathname,
		searchParams: createUrlSearchParams({
			outputLang: locale,
			serviceID: redmineId,
		}),
	});
}
