<script lang="ts" setup>
import { type NuxtLinkProps } from "#app";

const t = useTranslations("AppHeader");
const localePath = useLocalePath();

type Href = Exclude<NuxtLinkProps["href"], string>;

const links = {
	home: { href: { path: localePath("/") }, label: t("links.home") },
} satisfies Record<string, { href: Href; label: string }>;
</script>

<template>
	<header>
		<nav :aria-label="t('navigation-main')">
			<ul role="list">
				<li v-for="(link, key) of links" :key="key">
					<NuxtLink :href="link.href">
						{{ link.label }}
					</NuxtLink>
				</li>
			</ul>
		</nav>

		<LocaleSwitcher />
	</header>
</template>
