<script lang="ts" setup>
defineRouteRules({
	prerender: true,
});

definePageMeta({
	title: "ImprintPage.meta.title",
});

const t = useTranslations();
</script>

<template>
	<MainContent class="container py-8">
		<h1>{{ t("ImprintPage.title") }}</h1>
		<Imprint />
	</MainContent>
</template>
