import { preset } from "@acdh-oeaw/tailwindcss-preset";
import { type Config } from "tailwindcss";

const config = {
	content: [
		"./components/**/*.@(css|ts|vue)",
		"./content/**/*.md",
		"./layouts/**/*.@(css|ts|vue)",
		"./pages/**/*.@(css|ts|vue)",
	],
	presets: [preset],
} satisfies Config;

export default config;
