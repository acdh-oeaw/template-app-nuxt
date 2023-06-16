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
				<span class="sr-only">
					{{ t("switch-locale", { locale: t(`locales.${locale}`) }) }}
				</span>
				<span aria-hidden="true">{{ locale.toUpperCase() }}</span>
			</NuxtLink>
			<span v-else>
				<span class="sr-only">
					{{ t("current-locale", { locale: t(`locales.${locale}`) }) }}
				</span>
				<span aria-hidden="true">{{ locale.toUpperCase() }}</span>
			</span>
		</template>
	</div>
</template>
