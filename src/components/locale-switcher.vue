<script lang="ts" setup>
const locale = useLocale();
const t = useTranslations("LocaleSwitcher");
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
	<NuxtLink v-if="locale !== 'en'" :href="{ path: switchLocalePath('en') }">
		{{ t("switch-locale", { language: t("languages.english") }) }}
	</NuxtLink>
	<NuxtLink v-else :href="{ path: switchLocalePath('de') }">
		{{ t("switch-locale", { language: t("languages.german") }) }}
	</NuxtLink>
</template>
