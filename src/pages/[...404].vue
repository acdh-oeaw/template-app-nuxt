<script lang="ts" setup>
definePageMeta({
	title: "NotFoundPage.meta.title",
});

const t = useTranslations();

useSeoMeta({
	robots: {
		nofollow: true,
		noindex: true,
	},
});
</script>

<template>
	<MainContent class="container py-8">
		<h1>{{ t("NotFoundPage.title") }}</h1>
	</MainContent>
</template>
