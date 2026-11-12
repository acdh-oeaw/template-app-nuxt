<script lang="ts" setup>
import { createUrl, createUrlSearchParams } from "@acdh-oeaw/lib";

const env = useValidatedRuntimeConfig();

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
	onRequestError() {
		throw createError({ statusCode: 502 });
	},
});

watch(
	imprint.error,
	(error) => {
		if (error != null) {
			showError({
				fatal: true,
				statusCode: error.statusCode ?? 502,
				statusMessage: "Failed to load imprint",
			});
		}
	},
	{ immediate: true },
);
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
