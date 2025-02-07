<template>
	<NuxtLayout>
		<NuxtPage />
		<NuxtLoadingIndicator class="bg-neutral-950 dark:bg-white" :color="false" />
		<TailwindIndicator />
		<NuxtRouteAnnouncer />
	</NuxtLayout>
</template>
