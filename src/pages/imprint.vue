<script lang="ts" setup>
definePageMeta({
	title: "ImprintPage.meta.title",
});

const t = useTranslations("ImprintPage");
</script>

<template>
	<MainContent class="container py-8">
		<h1>{{ t("title") }}</h1>
		<Imprint />
	</MainContent>
</template>
