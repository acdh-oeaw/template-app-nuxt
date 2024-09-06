import { HttpError, log } from "@acdh-oeaw/lib";
import {
	dehydrate,
	type DehydratedState,
	hydrate,
	keepPreviousData,
	QueryCache,
	QueryClient,
	VueQueryPlugin,
	type VueQueryPluginOptions,
} from "@tanstack/vue-query";

export default defineNuxtPlugin((nuxt) => {
	const state = useState<DehydratedState | null>("vue-query");

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				placeholderData: keepPreviousData,
				staleTime: 1000 * 60 * 15,
			},
		},
		queryCache: new QueryCache({
			async onError(error) {
				const message = await getErrorMessage(error);

				log.error(message);
			},
		}),
	});

	const options: VueQueryPluginOptions = { queryClient };

	nuxt.vueApp.use(VueQueryPlugin, options);

	if (import.meta.server) {
		nuxt.hooks.hook("app:rendered", () => {
			state.value = dehydrate(queryClient);
		});
	}

	if (import.meta.client) {
		nuxt.hooks.hook("app:created", () => {
			hydrate(queryClient, state.value);
		});
	}
});

async function getErrorMessage(error: Error): Promise<string> {
	if (error instanceof HttpError) {
		const mediaType = error.response.headers.get("content-type")?.split(";", 1).at(0);
		if (mediaType === "application/json" && !error.response.bodyUsed) {
			try {
				const data = (await error.response.json()) as { message: string };

				return data.message;
			} catch {
				/** Fall through. */
			}
		}

		return error.response.statusText;
	}

	return error.message;
}
