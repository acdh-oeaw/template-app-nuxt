<script lang="ts" setup>
import { createImprintUrl } from "~/config/imprint.config";

const env = useRuntimeConfig();

const locale = useLocale();

const redmineId = env.public.NUXT_PUBLIC_REDMINE_ID;

const imprint = await useFetch(String(createImprintUrl(locale.value, redmineId)), {
	responseType: "text",
});
</script>

<template>
	<!-- eslint-disable-next-line vue/no-v-html -->
	<div class="prose" v-html="imprint.data.value" />
</template>
