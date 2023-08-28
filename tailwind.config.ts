import { createPreset } from "@acdh-oeaw/tailwindcss-preset";
import { type Config } from "tailwindcss";

const config = {
	content: [
		"./app.vue",
		"./error.vue",
		"./components/**/*.@(css|ts|vue)",
		"./content/**/*.md",
		"./layouts/**/*.@(css|ts|vue)",
		"./pages/**/*.@(css|ts|vue)",
	],
	presets: [createPreset()],
} satisfies Config;

export default config;
