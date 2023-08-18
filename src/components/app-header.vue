<script lang="ts" setup>
import { type NavLinkProps } from "@/components/nav-link.vue";

const t = useTranslations();

const links = computed(() => {
	return {
		home: { href: { path: "/" }, label: t("AppHeader.links.home") },
	} satisfies Record<string, { href: NavLinkProps["href"]; label: string }>;
});
</script>

<template>
	<header class="border-b border-neutral-200">
		<div class="container flex items-center justify-between gap-4 py-8">
			<nav :aria-label="t('AppHeader.navigation-main')">
				<ul class="flex items-center gap-4" role="list">
					<li v-for="(link, key) of links" :key="key">
						<NavLink :href="link.href">
							{{ link.label }}
						</NavLink>
					</li>
				</ul>
			</nav>

			<LocaleSwitcher />
		</div>
	</header>
</template>
