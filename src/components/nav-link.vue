<script lang="ts" setup>
import { type Locale } from "config/i18n.config";

import { type NuxtLinkProps } from "#app";

export interface NavLinkProps
	extends Omit<NuxtLinkProps, "href" | "to">,
		Required<Pick<NuxtLinkProps, "href">> {
	locale?: Locale;
}

const props = defineProps<NavLinkProps>();
</script>

<template>
	<NuxtLinkLocale v-bind="props">
		<slot />
	</NuxtLinkLocale>
</template>
