<script lang="ts" setup>
import { createUrl, createUrlSearchParams } from "@acdh-oeaw/lib";

const env = useRuntimeConfig();

const locale = useLocale();

const url = computed(() => {
	return String(
		createUrl({
			baseUrl: env.public.app.imprintServiceBaseUrl,
			pathname: `/${env.public.app.serviceId}`,
			searchParams: createUrlSearchParams({
				locale: locale.value,
				redmine: env.public.app.imprintCustomConfig,
			}),
		}),
	);
});

const imprint = await useFetch(url, {
	responseType: "text",
	onResponseError(error) {
		throw createError({ fatal: true, status: error.response.status });
	},
});
</script>

<template>
	<!-- oxlint-disable vue/no-v-html -->
	<div
		v-if="imprint.data.value"
		class="prose max-w-3xl dark:prose-invert"
		v-html="imprint.data.value"
	/>
	<!-- oxlint-enable vue/no-v-html -->
</template>
