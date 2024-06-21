import { log } from "@acdh-oeaw/lib";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const port = 5000;

const app = new Hono();

app.get("/api", (c) => {
	return c.text("Hello from the API!");
});

log.success(`Server is running on port ${String(port)}.`);

serve({
	fetch: app.fetch,
	port,
});
