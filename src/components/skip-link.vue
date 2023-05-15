<script lang="ts" setup>
const props = defineProps<{
	targetId: string;
}>();

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
		class="fixed -translate-y-full rounded bg-neutral-50 px-4 py-3 text-neutral-900 transition focus:translate-y-0"
		:href="{ hash: `#${props.targetId}` }"
		@click="onClick"
	>
		<slot />
	</NuxtLink>
</template>
