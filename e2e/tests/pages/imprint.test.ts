import { createUrl } from "@acdh-oeaw/lib";

import { locales } from "@/config/i18n.config";
import { expect, test } from "~/e2e/lib/test";

test.describe("imprint page", () => {
	const imprintServiceUrl = String(
		createUrl({ baseUrl: process.env.NUXT_PUBLIC_APP_IMPRINT_SERVICE_BASE_URL!, pathname: "/**" }),
	);

	for (const { status, title } of [
		{ status: 404, title: "NotFoundPage.title" },
		{ status: 503, title: "ErrorPage.title" },
	] as const) {
		test(`should show an error when the imprint service returns ${String(status)}`, async ({
			createIndexPage,
		}) => {
			const { indexPage, i18n } = await createIndexPage("en");
			const { page } = indexPage;

			await page.route(imprintServiceUrl, (route) => {
				return route.fulfill({ status, body: "Upstream service error" });
			});
			await indexPage.goto();
			await expect(
				page.getByRole("combobox", { name: i18n.t("ColorSchemeToggle.change-color-scheme") }),
			).toBeVisible();
			await page.getByRole("link", { name: i18n.t("AppFooter.links.imprint") }).click();

			await expect(page.getByRole("heading", { name: i18n.t(title) })).toBeVisible();
		});
	}

	test("should show an error when the imprint service cannot be reached", async ({
		createIndexPage,
	}) => {
		const { indexPage, i18n } = await createIndexPage("en");
		const { page } = indexPage;

		await page.route(imprintServiceUrl, (route) => {
			return route.abort("connectionrefused");
		});
		await indexPage.goto();
		await expect(
			page.getByRole("combobox", { name: i18n.t("ColorSchemeToggle.change-color-scheme") }),
		).toBeVisible();
		await page.getByRole("link", { name: i18n.t("AppFooter.links.imprint") }).click();

		await expect(page.getByRole("heading", { name: i18n.t("ErrorPage.title") })).toBeVisible();
		await expect(page.getByRole("main")).toContainText("502");
	});

	test("should show an error when loading the imprint after switching locale fails", async ({
		createIndexPage,
		createI18n,
	}) => {
		const { indexPage, i18n } = await createIndexPage("en");
		const { page } = indexPage;

		await page.route(imprintServiceUrl, (route) => {
			return route.fulfill({ status: 200, body: "<p>Legal disclosure</p>" });
		});
		await indexPage.goto();
		await expect(
			page.getByRole("combobox", { name: i18n.t("ColorSchemeToggle.change-color-scheme") }),
		).toBeVisible();
		await page.getByRole("link", { name: i18n.t("AppFooter.links.imprint") }).click();
		await expect(page.getByRole("main")).toContainText("Legal disclosure");

		await page.route(imprintServiceUrl, (route) => {
			return route.fulfill({ status: 503, body: "Upstream service error" });
		});
		await page
			.getByRole("link", { name: i18n.t("LocaleSwitcher.switch-locale", { locale: "German" }) })
			.click();

		const i18nDe = await createI18n("de");
		await expect(page.getByRole("heading", { name: i18nDe.t("ErrorPage.title") })).toBeVisible();
	});

	test("should have document title", async ({ createImprintPage }) => {
		for (const locale of locales) {
			const { i18n, imprintPage } = await createImprintPage(locale);
			await imprintPage.goto();

			await expect(imprintPage.page).toHaveTitle(
				[i18n.t("ImprintPage.meta.title"), i18n.t("DefaultLayout.meta.title")].join(" | "),
			);
		}
	});

	test("should have imprint text", async ({ createImprintPage }) => {
		const imprints = {
			de: "Offenlegung",
			en: "Legal disclosure",
		};

		for (const locale of locales) {
			const { imprintPage } = await createImprintPage(locale);
			await imprintPage.goto();

			await expect(imprintPage.page.getByRole("main")).toContainText(imprints[locale]);
		}
	});

	test("should not have any automatically detectable accessibility issues", async ({
		createAccessibilityScanner,
		createImprintPage,
	}) => {
		for (const locale of locales) {
			const { imprintPage } = await createImprintPage(locale);
			await imprintPage.goto();

			const { getViolations } = await createAccessibilityScanner();
			expect(await getViolations()).toStrictEqual([]);
		}
	});

	test.describe("should not have visible changes", () => {
		test.use({ colorScheme: "light" });

		test("in light mode", async ({ createImprintPage }) => {
			for (const locale of locales) {
				const { imprintPage } = await createImprintPage(locale);
				await imprintPage.goto();

				await expect(imprintPage.page).toHaveScreenshot();
			}
		});
	});

	test.describe("should not have visible changes", () => {
		test.use({ colorScheme: "dark" });

		test("in dark mode", async ({ createImprintPage }) => {
			for (const locale of locales) {
				const { imprintPage } = await createImprintPage(locale);
				await imprintPage.goto();

				await expect(imprintPage.page).toHaveScreenshot();
			}
		});
	});
});
