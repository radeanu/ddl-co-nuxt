<template>
	<section class="layout-wrapper">
		<p class="section-title">
			<span>Рассчитайте</span>
			<span class="color"> стоимость услуги</span>

			<UIDInputText v-model="n" name="n" placeholder="Name" />
		</p>
	</section>
</template>

<script setup lang="ts">
const n = ref('');
</script>

<style lang="scss" scoped>
section {
	margin-top: 50px;
}
</style>
