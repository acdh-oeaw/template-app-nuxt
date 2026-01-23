<script lang="ts" setup>
import { createUrl, createUrlSearchParams } from "@acdh-oeaw/lib";

const env = useRuntimeConfig();

const locale = useLocale();

const url = createUrl({
	baseUrl: env.public.app.imprintServiceBaseUrl,
	pathname: `/${env.public.app.serviceId}`,
	searchParams: createUrlSearchParams({
		locale: locale.value,
		redmine: env.public.app.imprintCustomConfig,
	}),
});

const imprint = await useFetch(String(url), {
	responseType: "text",
	onResponseError(error) {
		throw createError({ fatal: true, status: error.response.status });
	},
	watch: [locale],
});
</script>

<template>
	<!-- eslint-disable vue/no-v-html -->
	<div
		v-if="imprint.data.value"
		class="prose max-w-3xl dark:prose-invert"
		v-html="imprint.data.value"
	/>
	<!-- eslint-enable vue/no-v-html -->
</template>
