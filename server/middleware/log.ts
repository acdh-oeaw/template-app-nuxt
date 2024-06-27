import pino from "pino-http";

const logger = pino();

export default defineEventHandler((event) => {
	if (process.env.NODE_ENV === "production") {
		logger(event.node.req, event.node.res);
	}
});
