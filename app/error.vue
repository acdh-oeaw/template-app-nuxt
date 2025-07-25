<script lang="ts" setup>
const { error } = defineProps<{
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

// const locale = useLocale();
const t = useTranslations();
const localePath = useLocalePath();

const isNotFoundPage = computed(() => {
	return "statusCode" in error && error.statusCode === 404;
});

/** `error.vue` is *not* wrapped in default layout out of the box. */
useHead({
	titleTemplate: computed(() => {
		return ["%s", t("DefaultLayout.meta.title")].join(" | ");
	}),
	title: computed(() => {
		return isNotFoundPage.value ? t("NotFoundPage.meta.title") : t("ErrorPage.meta.title");
	}),
});

useSeoMeta({
	robots: {
		noindex: true,
	},
});

function onReset() {
	void clearError({ redirect: localePath("/") });
}
</script>

<template>
	<MainContent class="grid min-h-full place-content-center place-items-center gap-y-3">
		<template v-if="isNotFoundPage">
			<PageTitle>{{ t("NotFoundPage.title") }}</PageTitle>
		</template>

		<template v-else>
			<PageTitle>{{ t("ErrorPage.title") }}</PageTitle>
			<div class="flex items-center gap-4">
				<span>{{ "statusCode" in error ? error.statusCode : 500 }}</span>
				<span>{{ error.message }}</span>
			</div>
			<div>
				<button @click="onReset">
					{{ t("ErrorPage.try-again") }}
				</button>
			</div>
		</template>
	</MainContent>
</template>
