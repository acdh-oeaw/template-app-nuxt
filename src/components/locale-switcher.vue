<script lang="ts" setup>
import { locales } from "~/config/i18n.config";

const currentLocale = useLocale();
const t = useTranslations("LocaleSwitcher");
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
	<div class="flex items-center gap-2">
		<template v-for="(_, locale, index) of locales" :key="locale">
			<span v-if="index !== 0">|</span>

			<NuxtLink v-if="locale !== currentLocale" :href="{ path: switchLocalePath(locale) }">
				{{ t("switch-locale", { language: t(`languages.${locale}`) }) }}
			</NuxtLink>
			<span v-else>
				{{ t("current-locale", { language: t(`languages.${locale}`) }) }}
			</span>
		</template>
	</div>
</template>
