import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
	collections: {
		de_about: defineCollection({
			type: "page",
			source: "de/about/**/*.md",
			schema: z.object({
				title: z.string(),
				description: z.string().optional(),
			}),
		}),
		en_about: defineCollection({
			type: "page",
			source: "en/about/**/*.md",
			schema: z.object({
				title: z.string(),
				description: z.string().optional(),
			}),
		}),
	},
});
