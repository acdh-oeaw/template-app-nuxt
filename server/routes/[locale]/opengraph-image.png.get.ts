import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { defineEventHandler, defineLazyEventHandler, getRouterParam, setHeader } from "h3";
import satori from "satori";
import sharp from "sharp";
import * as v from "valibot";
import { createI18n } from "vue-i18n";

import { locales } from "@/config/i18n.config";
import de from "~/i18n/messages/de.json";
import en from "~/i18n/messages/en.json";

const messages = { de, en } as const;

const width = 1200;
const height = 630;

export default defineLazyEventHandler(async () => {
	const fontData = await readFile(
		join(process.cwd(), "public", "assets", "fonts", "inter-semibold.ttf"),
	);

	const logo = await readFile(join(process.cwd(), "public", "assets", "images", "logo.svg"));
	const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

	const images = new Map<string, Buffer>();

	for (const locale of locales) {
		const { t } = createI18n({
			legacy: false,
			locale,
			messages,
		}).global;

		const title = t("DefaultLayout.meta.title");
		const description = t("DefaultLayout.meta.description");

		const svg = await satori(
			{
				type: "div",
				props: {
					lang: locale,
					style: {
						display: "flex",
						flexDirection: "column",
						gap: 32,
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						height: "100%",
						padding: 16,
						backgroundColor: "#fff",
					},
					children: [
						{
							type: "img",
							props: {
								src: logoSrc,
								width: 200,
								height: 234,
							},
						},
						{
							type: "div",
							props: {
								style: {
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									gap: 16,
								},
								children: [
									{
										type: "div",
										props: {
											style: {
												fontWeight: 600,
												fontSize: 48,
												textAlign: "center",
												textWrap: "balance",
												/** @see https://github.com/vercel/satori/issues/498 */
												wordBreak: "break-word",
											},
											children: title,
										},
									},
									{
										type: "div",
										props: {
											style: {
												color: "#787f7f",
												fontWeight: 600,
												fontSize: 24,
												textAlign: "center",
												textWrap: "balance",
												/** @see https://github.com/vercel/satori/issues/498 */
												wordBreak: "break-word",
											},
											children: description,
										},
									},
								],
							},
						},
					],
				},
			},
			{
				width,
				height,
				fonts: [{ name: "Inter", data: fontData, weight: 600, style: "normal" }],
			},
		);

		const png = await sharp(Buffer.from(svg)).png().toBuffer();
		images.set(locale, png);
	}

	const localeSchema = v.picklist(locales);

	return defineEventHandler((event) => {
		const locale = v.parse(localeSchema, getRouterParam(event, "locale"));

		setHeader(event, "content-type", "image/png");
		setHeader(event, "cache-control", "public, max-age=31536000, immutable");

		return images.get(locale)!;
	});
});
