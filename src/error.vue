<script lang="ts" setup>
definePageMeta({
	title: "ErrorPage.meta.title",
});

defineProps<{
	error: Error;
}>();

const t = useTranslations("ErrorPage");
const localePath = useLocalePath();

useSeoMeta({
	robots: {
		nofollow: true,
		noindex: true,
	},
});

function onReset() {
	clearError({ redirect: localePath("/") });
}
</script>

<template>
	<MainContent>
		<h1>{{ t("title") }}</h1>
		<button @click="onReset">{{ t("try-again") }}</button>
	</MainContent>
</template>
