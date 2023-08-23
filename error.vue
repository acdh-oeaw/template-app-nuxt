<script lang="ts" setup>
/**
 * `error.vue` sits outside the routing structure, so we cannot define page metadata.
 *
 * @see https://github.com/nuxt/nuxt/issues/19344#issuecomment-1449685103
 */
// definePageMeta({
// 	title: "ErrorPage.meta.title",
// });

defineProps<{
	error: Error;
}>();

const t = useTranslations();
const localePath = useLocalePath();

useSeoMeta({
	robots: {
		nofollow: true,
		noindex: true,
	},
});

function onReset() {
	void clearError({ redirect: localePath("/") });
}
</script>

<template>
	<MainContent class="grid min-h-full place-content-center">
		<h1>{{ t("ErrorPage.title") }}</h1>
		<button @click="onReset">{{ t("ErrorPage.try-again") }}</button>
	</MainContent>
</template>
