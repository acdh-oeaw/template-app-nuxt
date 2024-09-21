<script lang="ts" setup>
const isVisible = import.meta.dev;
</script>

<template>
	<div
		v-if="isVisible"
		className="fixed bottom-1 left-1 z-10 grid size-8 place-content-center rounded-full bg-on-background p-2 font-mono text-xs font-medium text-background"
	>
		<span className="xs:hidden">2xs</span>
		<span className="max-xs:hidden sm:hidden">xs</span>
		<span className="max-sm:hidden md:hidden">sm</span>
		<span className="max-md:hidden lg:hidden">md</span>
		<span className="max-lg:hidden xl:hidden">lg</span>
		<span className="max-xl:hidden 2xl:hidden">xl</span>
		<span className="max-2xl:hidden 3xl:hidden">2xl</span>
		<span className="max-3xl:hidden">3xl</span>
	</div>
</template>
