<script lang="ts" setup>
import { createImprintUrl } from "~/config/imprint.config";

definePageMeta({
	title: "ImprintPage.meta.title",
});

const env = useRuntimeConfig();

const locale = useLocale();
const t = useTranslations("ImprintPage");

const redmineId = env.public.NUXT_PUBLIC_REDMINE_ID;

const imprint = await useFetch(String(createImprintUrl(locale.value, redmineId)), {
	responseType: "text",
});
</script>

<template>
	<MainContent class="container py-8">
		<h1>{{ t("title") }}</h1>
		<!-- eslint-disable-next-line vue/no-v-html -->
		<div v-if="imprint.data.value" class="prose" v-html="imprint.data.value" />
	</MainContent>
</template>
