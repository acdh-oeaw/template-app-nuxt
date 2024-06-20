import { createPreset } from "@acdh-oeaw/tailwindcss-preset";
import type { Config } from "tailwindcss";

const preset = createPreset();

const config = {
	content: ["./app/**/*.@(css|ts|vue)", "./content/**/*.md"],
	presets: [preset],
} satisfies Config;

export default config;
