<script lang="ts" setup>
import * as Sentry from "@sentry/nuxt";

const t = useTranslations();

function onError(error: Error) {
	Sentry.captureException(error);
}
</script>

<template>
	<NuxtErrorBoundary @error="onError">
		<slot />

		<template #error="{ error }">
			<div class="relative">
				<Centered>
					<p>{{ t("ErrorBoundary.error") }}: {{ error }}</p>
				</Centered>
			</div>
		</template>
	</NuxtErrorBoundary>
</template>
