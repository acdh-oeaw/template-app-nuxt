<script lang="ts" setup>
import { createImprintUrl } from "@/config/imprint.config";

const env = useRuntimeConfig();

const locale = useLocale();

const redmineId = env.public.redmineId;

const imprint = await useFetch(String(createImprintUrl(locale.value, redmineId)), {
	responseType: "text",
	onResponseError(error) {
		throw createError({ fatal: true, statusCode: error.response.status });
	},
	watch: [locale],
});
</script>

<template>
	<!-- eslint-disable-next-line vue/no-v-html -->
	<div v-if="imprint.data.value" class="prose max-w-3xl" v-html="imprint.data.value" />
</template>
