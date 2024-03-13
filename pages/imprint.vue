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
	<MainContent class="container grid content-start gap-y-8 py-8">
		<PageTitle>{{ t("ImprintPage.title") }}</PageTitle>
		<Imprint />
	</MainContent>
</template>
