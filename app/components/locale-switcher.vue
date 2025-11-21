<script lang="ts" setup>
import { de, en } from "@nuxt/ui/locale";

const messages = { de, en };

const { locale, setLocale } = useI18n();
</script>

<template>
	<ULocaleSelect
		:model-value="locale"
		:locales="Object.values(messages)"
		@update:model-value="setLocale($event as typeof locale)"
	/>
</template>
