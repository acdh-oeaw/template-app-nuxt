<script lang="ts" setup>
const t = useTranslations();
</script>

<template>
	<NuxtErrorBoundary>
		<slot />

		<template #error="{ error }">
			<p>{{ t("ErrorBoundary.error") }}: {{ error }}</p>
		</template>
	</NuxtErrorBoundary>
</template>
