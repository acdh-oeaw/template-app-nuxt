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
					{{ t("switch-locale", { language: t(`languages.${locale}`) }) }}
					{{ locale.toUpperCase() }}
				</span>
			</NuxtLink>
			<span v-else>
				<span class="sr-only">
					{{ t("current-locale", { language: t(`languages.${locale}`) }) }}
				</span>
				{{ locale.toUpperCase() }}
			</span>
		</template>
	</div>
</template>
