<script lang="ts" setup>
import { de, en } from "@nuxt/ui/locale";

const messages = { de, en };

const { locale } = useI18n();
</script>

<template>
	<UApp :locale="messages[locale]">
		<NuxtLayout>
			<NuxtPage />
			<NuxtLoadingIndicator class="bg-neutral-950 dark:bg-white" :color="false" />
			<TailwindIndicator />
			<NuxtRouteAnnouncer />
		</NuxtLayout>
	</UApp>
</template>
