import { defineEventHandler, setResponseHeader } from "h3";

export default defineEventHandler((event) => {
	setResponseHeader(event, "Cache-Control", "no-store");
	return { status: "ok" };
});
