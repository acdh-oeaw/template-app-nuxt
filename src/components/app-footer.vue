<script lang="ts" setup>
import { type NuxtLinkProps } from "#app";

const t = useTranslations("AppFooter");
const localePath = useLocalePath();

type Href = Exclude<NuxtLinkProps["href"], string>;

const links = {
	imprint: { href: { path: localePath("/imprint") }, label: t("links.imprint") },
} satisfies Record<string, { href: Href; label: string }>;
</script>

<template>
	<footer>
		<nav :aria-label="t('navigation-secondary')">
			<ul role="list">
				<li v-for="(link, key) of links" :key="key">
					<NuxtLink :href="link.href">
						{{ link.label }}
					</NuxtLink>
				</li>
			</ul>
		</nav>
	</footer>
</template>
