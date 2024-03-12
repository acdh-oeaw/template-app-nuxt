<script lang="ts" setup>
const t = useTranslations();

const colorMode = useColorMode();

const colorSchemes = ["system", "light", "dark"] as const;
</script>

<template>
	<ClientOnly>
		<label>
			<span class="sr-only">{{ t("ColorSchemeToggle.change-color-scheme") }}</span>
			<select v-model="colorMode.preference">
				<option v-for="colorScheme of colorSchemes" :key="colorScheme" :value="colorScheme">
					{{ t(`ColorSchemeToggle.color-schemes.${colorScheme}`) }}
				</option>
			</select>
		</label>
	</ClientOnly>
</template>
