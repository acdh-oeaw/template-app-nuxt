<script lang="ts" setup>
definePageMeta({
	title: "IndexPage.meta.title",
});

const t = useTranslations("IndexPage");
</script>

<template>
	<MainContent>
		<h1>{{ t("title") }}</h1>
	</MainContent>
</template>
