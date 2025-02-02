<script lang="ts" setup>
import type { NuxtLinkProps } from "#app";

const t = useTranslations();

const links = computed(() => {
	return {
		imprint: { href: { path: "/imprint" }, label: t("AppFooter.links.imprint") },
	} satisfies Record<string, { href: NuxtLinkProps["href"]; label: string }>;
});
</script>

<template>
	<footer class="border-t border-neutral-200 dark:border-neutral-700">
		<div class="container flex items-center justify-between gap-4 py-8">
			<nav :aria-label="t('AppFooter.navigation-secondary')">
				<ul class="flex items-center gap-4" role="list">
					<li v-for="(link, key) of links" :key="key">
						<NuxtLinkLocale :href="link.href">
							{{ link.label }}
						</NuxtLinkLocale>
					</li>
				</ul>
			</nav>
		</div>
	</footer>
</template>
