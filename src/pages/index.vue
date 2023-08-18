<script lang="ts" setup>
definePageMeta({
	title: "IndexPage.meta.title",
});

const t = useTranslations();
</script>

<template>
	<MainContent class="container py-8">
		<h1>{{ t("IndexPage.title") }}</h1>
	</MainContent>
</template>
