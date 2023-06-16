import { expect, test } from "@playwright/test";

test("home page should have document title", async ({ page }) => {
	await page.goto("/en");
	await expect(page).toHaveTitle("Home | ACDH-CH App");

	await page.goto("/de");
	await expect(page).toHaveTitle("Startseite | ACDH-CH App");
});
