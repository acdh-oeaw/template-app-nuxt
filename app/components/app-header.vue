<script lang="ts" setup>
import type { NuxtLinkProps } from "#app";

const t = useTranslations();

const links = computed(() => {
	return {
		home: { href: { path: "/" }, label: t("AppHeader.links.home") },
	} satisfies Record<string, { href: NuxtLinkProps["href"]; label: string }>;
});
</script>

<template>
	<header class="border-b border-neutral-200 dark:border-neutral-700">
		<div class="container flex items-center justify-between gap-4 py-8">
			<nav :aria-label="t('AppHeader.navigation-main')">
				<ul class="flex items-center gap-4" role="list">
					<li v-for="(link, key) of links" :key="key">
						<NuxtLinkLocale :href="link.href">
							{{ link.label }}
						</NuxtLinkLocale>
					</li>
				</ul>
			</nav>

			<div class="flex items-center gap-4">
				<ColorSchemeSwitcher />
				<LocaleSwitcher />
			</div>
		</div>
	</header>
</template>
