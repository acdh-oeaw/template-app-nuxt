/** @typedef {import('tailwindcss').Config} TailwindConfig */

import typographyPlugin from "@tailwindcss/typography";
import colors from "tailwindcss/colors";
import animatePlugin from "tailwindcss-animate";

const neutral = colors.slate;
const negative = colors.red;
const primary = colors.slate;

/** @type {TailwindConfig} */
const config = {
	content: [
		"./content/**/*.md",
		"./src/components**/*.@(css|ts|vue)",
		"./src/layouts/**/*.@(css|ts|vue)",
		"./src/pages/**/*.@(css|ts|vue)",
	],
	darkMode: ["class", '[data-color-scheme="dark"]'],
	plugins: [animatePlugin, typographyPlugin],
	theme: {
		extend: {
			colors: {
				neutral,
				negative,
				primary,
			},
			fontFamily: {
				sans: ["Inter Variable", "ui-sans-serif", "system-ui", "sans-serif"],
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: null,
					},
				},
			},
		},
	},
};

export default config;
