<template>
	<label :class="classes">
		<input v-model="model" :value type="checkbox" :disabled />
		<slot name="label" :value> {{ label }} </slot>
	</label>
</template>

<script setup lang="ts" generic="T">
export type DCheckbox<T> = {
	value?: T;
	label?: string;
	error?: string;
	disabled?: boolean;
};

const props = defineProps<DCheckbox<T>>();

const model = defineModel<T | T[]>({ required: true });

const classes = computed(() => {
	return {
		checkbox: true,
		disabled: props.disabled
	};
});
</script>

<style scoped lang="scss">
.checkbox {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	gap: 12px;
	color: #333333;
	cursor: pointer;

	input {
		margin: 0;
		appearance: none;
		position: relative;
		-webkit-appearance: none;
		border-radius: 4px;
		background-color: #fafafa;
		border: 0.056rem solid #d9d9d9;
		width: 20px;
		height: 20px;

		&::before {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			transform: scale(0);
			background-image: url('/images/svg/check.svg');
			background-position: center;
			background-repeat: no-repeat;
			background-size: contain;
			transition: all 0.1s;
		}

		&:hover {
			border-color: #808080;
		}

		&:checked:not(:disabled) {
			color: #ffffff;
			border-color: #d9d9d9;
			background-color: #4e79eb;
		}

		&:checked::before {
			transform: scale(1);
		}
	}
}

.checkbox.disabled,
.checkbox input:disabled {
	user-select: none;
	pointer-events: none;
}

.checkbox input:disabled {
	border-color: #d9d9d9;
	background-color: #fafafa;

	&::before {
		background-image: none;
	}
}
</style>
