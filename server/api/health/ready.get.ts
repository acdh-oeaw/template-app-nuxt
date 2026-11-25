import { defineEventHandler } from "nuxt/server";

export default defineEventHandler((event) => {
	event.res.headers.set("Cache-Control", "no-store");
	return { status: "ok" };
});
