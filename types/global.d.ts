/**
 * @see https://github.com/jamiebuilds/tailwindcss-animate/pull/32
 */
declare module "tailwindcss-animate" {
	const plugin: { handler: () => void };

	export = plugin;
}
