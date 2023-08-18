import { preset } from "@acdh-oeaw/tailwindcss-preset";
import { type Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/components/**/*.@(css|ts|vue)",
		"./src/content/**/*.md",
		"./src/layouts/**/*.@(css|ts|vue)",
		"./src/pages/**/*.@(css|ts|vue)",
	],
	presets: [preset],
};

export default config;
