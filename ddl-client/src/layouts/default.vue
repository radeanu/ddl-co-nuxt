<template>
	<div class="default">
		<DHeader />

		<slot />
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.default {
	width: 100%;
	height: 100%;
}
</style>
