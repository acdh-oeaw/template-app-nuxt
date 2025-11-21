<script lang="ts" setup>
const { t } = useI18n();

usePageMetadata({
	title: t("ImprintPage.meta.title"),
});
</script>

<template>
	<MainContent class="container grid content-start gap-y-8 py-8">
		<PageTitle>{{ t("ImprintPage.title") }}</PageTitle>
		<Imprint />
	</MainContent>
</template>
