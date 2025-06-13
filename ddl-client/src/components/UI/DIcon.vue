<template>
	<NuxtIcon :name="'local:' + name" class="icon" :size />
</template>

<script setup lang="ts">
export type ShIcon = {
	name: string;
	size?: string;
};

withDefaults(defineProps<ShIcon>(), {
	size: '1.3333rem'
});
</script>

<style lang="scss" scoped>
.icon {
	width: var(--icon-width, 1.3333rem);
	height: var(--icon-height, 1.3333rem);
}
</style>
