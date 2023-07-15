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
	<MainContent class="grid min-h-full place-items-center">
		<h1>{{ t("title") }}</h1>
		<button @click="onReset">{{ t("try-again") }}</button>
	</MainContent>
</template>
