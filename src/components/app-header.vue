<script lang="ts" setup>
import { type NavLinkProps } from "@/components/nav-link.vue";

const t = useTranslations("AppHeader");

const links = {
	home: { href: { path: "/" }, label: t("links.home") },
} satisfies Record<string, { href: NavLinkProps["href"]; label: string }>;
</script>

<template>
	<header>
		<nav :aria-label="t('navigation-main')">
			<ul role="list">
				<li v-for="(link, key) of links" :key="key">
					<NavLink :href="link.href">
						{{ link.label }}
					</NavLink>
				</li>
			</ul>
		</nav>

		<LocaleSwitcher />
	</header>
</template>
