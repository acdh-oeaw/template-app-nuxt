<script lang="ts" setup>
import { locales } from "@/config/i18n.config";

const currentLocale = useLocale();
const t = useTranslations();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();
const labels = computed(() => {
	return new Intl.DisplayNames([currentLocale.value], { type: "language" });
});
</script>

<template>
	<div class="flex items-center gap-2">
		<template v-for="(locale, index) of locales" :key="locale">
			<span v-if="index !== 0">|</span>

			<NuxtLink
				v-if="locale !== currentLocale"
				:href="{ path: switchLocalePath(locale), query: route.query }"
			>
				<span class="sr-only">
					{{ t("LocaleSwitcher.switch-locale", { locale: labels.of(locale) }) }}
				</span>
				<span aria-hidden="true">{{ locale.toUpperCase() }}</span>
			</NuxtLink>
			<span v-else>
				<span class="sr-only">
					{{ t("LocaleSwitcher.current-locale", { locale: labels.of(locale) }) }}
				</span>
				<span aria-hidden="true">{{ locale.toUpperCase() }}</span>
			</span>
		</template>
	</div>
</template>
