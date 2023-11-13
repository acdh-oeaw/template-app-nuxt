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
	error:
		| Error
		| {
				url: string;
				statusCode: number;
				statusMessage: string;
				message: string;
				description: string;
		  };
}>();

const t = useTranslations();
const localePath = useLocalePath();

/** `error.vue` is *not* wrapped in default layout out of the box. */
useHead({
	title: computed(() => {
		return t("ErrorPage.meta.title");
	}),
});

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
		<div class="flex items-center gap-4">
			<span>{{ "statusCode" in error ? error.statusCode : 500 }}</span>
			<span>{{ error.message }}</span>
		</div>
		<div>
			<button @click="onReset">{{ t("ErrorPage.try-again") }}</button>
		</div>
	</MainContent>
</template>
