<script lang="ts" setup>
import { createImprintUrl } from "~/config/imprint.config";

definePageMeta({
	title: "ImprintPage.meta.title",
});

const locale = useLocale();
const t = useTranslations("ImprintPage");

const imprint = await useFetch(String(createImprintUrl(locale.value)), { responseType: "text" });
</script>

<template>
	<MainContent>
		<h1>{{ t("title") }}</h1>
		<!-- eslint-disable-next-line vue/no-v-html -->
		<div class="prose" v-html="imprint.data.value" />
	</MainContent>
</template>
