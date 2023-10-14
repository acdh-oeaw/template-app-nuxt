<script lang="ts" setup>
import { locales } from "@/config/i18n.config";

const currentLocale = useLocale();
const t = useTranslations();
const switchLocalePath = useSwitchLocalePath();
const { setLocale } = useI18n();
</script>

<template>
	<div class="flex items-center gap-2">
		<template v-for="(_, locale, index) of locales" :key="locale">
			<span v-if="index !== 0">|</span>

			<!--
				`@nuxtjs/i18n` does not update the locale cookie on route change, so we need to
				call `setLocale` explicitly.

				@see https://i18n.nuxtjs.org/guide/lang-switcher
			 -->
			<NuxtLink
				v-if="locale !== currentLocale"
				:href="{ path: switchLocalePath(locale) }"
				@click.prevent.stop="setLocale(locale)"
			>
				<span class="sr-only">
					{{ t("LocaleSwitcher.switch-locale", { locale: t(`LocaleSwitcher.locales.${locale}`) }) }}
				</span>
				<span aria-hidden="true">{{ locale.toUpperCase() }}</span>
			</NuxtLink>
			<span v-else>
				<span class="sr-only">
					{{
						t("LocaleSwitcher.current-locale", { locale: t(`LocaleSwitcher.locales.${locale}`) })
					}}
				</span>
				<span aria-hidden="true">{{ locale.toUpperCase() }}</span>
			</span>
		</template>
	</div>
</template>
