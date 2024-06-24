import * as v from "valibot";

export const EntitySchema = v.object({
	id: v.pipe(v.string(), v.minLength(1)),
	label: v.pipe(v.string(), v.minLength(1)),
});

export const EntityInputSchema = v.omit(EntitySchema, ["id"]);

type Entity = v.InferOutput<typeof EntitySchema>;

type EntityInput = v.InferInput<typeof EntityInputSchema>;

const entities = new Map<Entity["id"], Entity>();

const db = {
	entities,
};

export async function getEntities(): Promise<Array<Entity>> {
	const entities = Array.from(db.entities.values());
	return Promise.resolve(entities);
}

export async function createEntity(input: EntityInput): Promise<Entity> {
	// eslint-disable-next-line n/no-unsupported-features/node-builtins
	const entity = { ...input, id: crypto.randomUUID() };
	db.entities.set(entity.id, entity);
	return Promise.resolve(entity);
}

export async function getEntity(id: Entity["id"]): Promise<Entity | null> {
	if (!db.entities.has(id)) {
		return null;
	}
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const entity = db.entities.get(id)!;
	return Promise.resolve(entity);
}

export async function updateEntity(id: Entity["id"], input: EntityInput): Promise<Entity | null> {
	if (!db.entities.has(id)) {
		return null;
	}
	const entity = { ...input, id };
	db.entities.set(entity.id, entity);
	return Promise.resolve(entity);
}

export async function deleteEntity(id: Entity["id"]): Promise<Entity | null> {
	if (!db.entities.has(id)) {
		return null;
	}
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const entity = db.entities.get(id)!;
	db.entities.delete(id);
	return Promise.resolve(entity);
}
