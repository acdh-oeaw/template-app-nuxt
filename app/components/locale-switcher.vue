<script lang="ts" setup>
import { type Locale, locales } from "@/config/i18n.config";

const currentLocale = useLocale();
const t = useTranslations();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();

const names = computed(() => {
	const names = {} as Record<Locale, Intl.DisplayNames>;

	for (const locale of locales) {
		names[locale] = new Intl.DisplayNames(locale, { type: "language" });
	}

	return names;
});
</script>

<template>
	<div class="flex items-center gap-2">
		<template v-for="(locale, index) of locales" :key="locale">
			<span v-if="index !== 0" aria-hidden="true">|</span>

			<NuxtLink
				v-if="locale !== currentLocale"
				:href="{ path: switchLocalePath(locale), query: route.query }"
				:hreflang="locale"
			>
				<span class="sr-only">
					{{ t("LocaleSwitcher.switch-locale", { locale: names[currentLocale].of(locale) }) }}
					<span :lang="locale"> ({{ names[locale].of(locale) }})</span>
				</span>
				<span aria-hidden="true">{{ locale.toUpperCase() }}</span>
			</NuxtLink>
			<span v-else>
				<span class="sr-only">
					{{ t("LocaleSwitcher.current-locale", { locale: names[locale].of(locale) }) }}
				</span>
				<span aria-hidden="true">{{ locale.toUpperCase() }}</span>
			</span>
		</template>
	</div>
</template>
