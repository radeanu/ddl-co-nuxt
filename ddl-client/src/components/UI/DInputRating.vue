<template>
	<div class="input-wrapper">
		<div class="rating">
			<span v-if="label?.length">{{ label }}</span>

			<div class="stars">
				<UIDIcon
					v-for="v in count"
					:key="v"
					:class="{
						disabled,
						star: true,
						filled: model >= v || hover >= v
					}"
					:name="model >= v || hover >= v ? 'star-filled' : 'star'"
					@click="handleClick(v)"
					@mouseover="handleOver(v)"
					@mouseleave="handleLeave"
				/>
			</div>
		</div>

		<p v-if="error" class="input-error">{{ error }}</p>
	</div>
</template>

<script setup lang="ts">
export type DInputRating = {
	min: number;
	max: number;
	count: number;
	label?: string;
	error?: string;
	disabled?: boolean;
};

const props = defineProps<DInputRating>();

const hover = ref(0);
const model = defineModel<number>({ required: true, default: 0 });

function handleClick(v: number) {
	if (props.disabled) return;
	model.value = v;
}

function handleOver(v: number) {
	if (props.disabled) return;
	hover.value = v;
}

function handleLeave() {
	if (props.disabled) return;
	hover.value = 0;
}
</script>

<style scoped lang="scss">
.rating {
	display: flex;
	flex-wrap: nowrap;
	gap: 16px;
	align-items: center;
}

.stars {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
}

.star {
	--icon-width: 20px;
	--icon-height: 20px;
	color: #454545;

	&.filled,
	&:hover:not(.disabled) {
		color: #638fff;
	}
}
</style>
