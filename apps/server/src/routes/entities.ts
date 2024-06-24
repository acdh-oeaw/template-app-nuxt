import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";

import {
	createEntity,
	deleteEntity,
	EntityInputSchema,
	getEntities,
	getEntity,
	updateEntity,
} from "@/db";

export const entities = new Hono()
	.get("/", async (c) => {
		const entities = await getEntities();
		return c.json({ entities });
	})
	.post("/", vValidator("form", EntityInputSchema), async (c) => {
		const input = c.req.valid("form");
		const entity = await createEntity(input);
		return c.json(entity);
	})
	.get("/:id", async (c) => {
		const id = c.req.param("id");
		const entity = await getEntity(id);
		if (entity == null) {
			return c.notFound();
		}
		return c.json(entity);
	})
	.put("/:id", vValidator("form", EntityInputSchema), async (c) => {
		const id = c.req.param("id");
		const input = c.req.valid("form");
		const entity = await updateEntity(id, input);
		if (entity == null) {
			return c.notFound();
		}
		return c.json(entity);
	})
	.delete("/:id", async (c) => {
		const id = c.req.param("id");
		const entity = await deleteEntity(id);
		if (entity == null) {
			return c.notFound();
		}
		return c.json(entity);
	});
