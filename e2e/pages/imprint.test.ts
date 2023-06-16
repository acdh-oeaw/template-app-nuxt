import { expect, test } from "@playwright/test";

test("imprint page should have document title", async ({ page }) => {
	await page.goto("/en/imprint");
	await expect(page).toHaveTitle("Imprint | ACDH-CH App");

	await page.goto("/de/imprint");
	await expect(page).toHaveTitle("Impressum | ACDH-CH App");
});

test("imprint page should have imprint text", async ({ page }) => {
	await page.goto("/en/imprint");
	await expect(page.getByRole("main")).toContainText("Legal disclosure");

	await page.goto("/de/imprint");
	await expect(page.getByRole("main")).toContainText("Offenlegung");
});
