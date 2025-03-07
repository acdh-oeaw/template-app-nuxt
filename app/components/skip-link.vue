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
		class="fixed -translate-y-full rounded bg-neutral-950 px-4 py-3 text-white transition focus:translate-y-0 dark:bg-white dark:text-neutral-950"
		:href="{ hash: `#${props.targetId}`, query: route.query }"
		@click="onClick"
	>
		<slot />
	</NuxtLink>
</template>
