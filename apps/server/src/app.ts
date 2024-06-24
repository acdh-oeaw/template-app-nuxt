import { Hono } from "hono";
import { logger } from "hono/logger";

/**
 * With path alias, type inference breaks.
 *
 * @see https://github.com/honojs/hono/issues/1746
 */
import { entities } from "./routes/entities";

const app = new Hono();

app.use(logger());

const api = app.basePath("/api").route("/entities", entities);

export type Api = typeof api;

export { app };
