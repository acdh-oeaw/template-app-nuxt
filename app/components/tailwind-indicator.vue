<script lang="ts" setup>
const isVisible = import.meta.dev;
</script>

<template>
	<div
		v-if="isVisible"
		class="fixed right-5 bottom-5 z-10 grid size-9 cursor-default place-content-center rounded-full bg-neutral-950 font-mono text-xs font-semibold text-white shadow-md select-none dark:bg-white dark:text-neutral-950"
		role="status"
	>
		<span class="xs:hidden">2xs</span>
		<span class="max-xs:hidden sm:hidden">xs</span>
		<span class="max-sm:hidden md:hidden">sm</span>
		<span class="max-md:hidden lg:hidden">md</span>
		<span class="max-lg:hidden xl:hidden">lg</span>
		<span class="max-xl:hidden 2xl:hidden">xl</span>
		<span class="max-2xl:hidden 3xl:hidden">2xl</span>
		<span class="max-3xl:hidden">3xl</span>
	</div>
</template>
