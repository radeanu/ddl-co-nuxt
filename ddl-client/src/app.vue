<template>
	<div>
		<NuxtLoadingIndicator
			:height="0"
			:throttle="0"
			style="transform: unset"
		>
			<RouteLoader />
		</NuxtLoadingIndicator>

		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'Клининговая компания',
    titleTemplate: '%s',
	meta: [
		{
			name: 'description',
			content:
				'Услуги по уборке жилых и коммерческих помещений. Услуги по чистке, прочистке канализации, устранение засоров.'
		}
	]
});
</script>

<style lang="scss" scoped></style>
