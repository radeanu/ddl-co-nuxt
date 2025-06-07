<template>
	<nuxt-link class="link focusable" tabindex="0">
		<slot />
	</nuxt-link>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.link {
	overflow: hidden;
	display: block;
	width: fit-content;
	max-width: fit-content;
}
</style>
