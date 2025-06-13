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

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
