<script lang="ts" setup>
definePageMeta({
	title: "NotFoundPage.meta.title",
});

const t = useTranslations("NotFoundPage");

useSeoMeta({
	robots: {
		nofollow: true,
		noindex: true,
	},
});
</script>

<template>
	<MainContent class="container py-8">
		<h1>{{ t("title") }}</h1>
	</MainContent>
</template>
