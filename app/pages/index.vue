<script lang="ts" setup>
const { t } = useI18n();

usePageMetadata({
	title: t("IndexPage.meta.title"),
});
</script>

<template>
	<MainContent class="container grid content-start gap-y-8 py-8">
		<PageTitle>{{ t("IndexPage.title") }}</PageTitle>
	</MainContent>
</template>
