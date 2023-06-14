<script lang="ts" setup>
const locale = useLocale();
const t = useTranslations("LocaleSwitcher");
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
	<div class="flex items-center gap-2">
		<NuxtLink v-if="locale !== 'en'" :href="{ path: switchLocalePath('en') }">
			{{ t("switch-locale", { language: t("languages.english") }) }}
		</NuxtLink>
		<span v-else>
			{{ t("current-locale", { language: t("languages.english") }) }}
		</span>

		<span>|</span>

		<NuxtLink v-if="locale !== 'de'" :href="{ path: switchLocalePath('de') }">
			{{ t("switch-locale", { language: t("languages.german") }) }}
		</NuxtLink>
		<span v-else>
			{{ t("current-locale", { language: t("languages.english") }) }}
		</span>
	</div>
</template>
