<script lang="ts" setup>
import * as locales from "@nuxt/ui/locale";

const { locale } = useI18n();
</script>

<template>
	<UApp :locale="locales[locale]">
		<NuxtLayout>
			<NuxtPage />
			<NuxtLoadingIndicator class="bg-neutral-950 dark:bg-white" :color="false" />
			<TailwindIndicator />
			<NuxtRouteAnnouncer />
		</NuxtLayout>
	</UApp>
</template>
