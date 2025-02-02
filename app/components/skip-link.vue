<script lang="ts" setup>
const props = defineProps<{
	targetId: string;
}>();

const route = useRoute();

/**
 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=308064
 */
function onClick() {
	const element = document.getElementById(props.targetId);
	element?.focus();
}
</script>

<template>
	<NuxtLink
		class="rounded fixed -translate-y-full px-4 py-3 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 transition focus:translate-y-0"
		:href="{ hash: `#${props.targetId}`, query: route.query }"
		@click="onClick"
	>
		<slot />
	</NuxtLink>
</template>
