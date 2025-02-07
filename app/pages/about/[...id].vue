<script setup lang="ts">
defineRouteRules({
	prerender: true,
});

const locale = useLocale();
const t = useTranslations();

const route = useRoute();

const entry = computed(() => {
	const collection = `${locale.value}_about` as const;
	const _id = Array.isArray(route.params.id) ? route.params.id.join("/") : route.params.id;
	const id = _id === "index" ? "" : _id;
	return { collection, id };
});

const { data: page } = await useAsyncData(
	`${entry.value.collection}_${entry.value.id}`,
	() => {
		return queryCollection(entry.value.collection)
			.path(`/${locale.value}/about/${entry.value.id}`)
			.first();
	},
	{ watch: [locale] },
);

useSeoMeta({
	title: page.value?.title,
	description: page.value?.description,
});
</script>

<template>
	<MainContent class="container grid content-start gap-y-8 py-8">
		<template v-if="page">
			<PageTitle>{{ page.title }}</PageTitle>
			<ContentRenderer class="prose dark:prose-invert" :value="page" />
		</template>

		<div v-else>{{ t("AboutPage.page-not-found") }}</div>
	</MainContent>
</template>
