<template>
	<div class="input-wrapper">
		<div :class="classes" @click="focusOnInputEl">
			<slot name="left" />

			<input
				:id
				:min
				:max
				:name
				:disabled
				:required
				:placeholder
				type="number"
				ref="inputEl"
				class="input"
				v-model.number="model"
				@blur="handleBlur"
				@change="emits('change', $event)"
				@input="emits('input', $event)"
				@keydown="handleKeyDown"
				@focus="handleFocus($event)"
			/>

			<slot name="right" />
		</div>

		<p v-if="error && !disabled" class="input-error">{{ error }}</p>
	</div>
</template>

<script setup lang="ts">
import { getRandomId } from '@/utils/index';

export type DInputNumber = {
	min?: number;
	max?: number;
	name?: string;
	disabled?: boolean;
	required?: boolean;
	placeholder?: string;
	error?: string;
};

const props = defineProps<DInputNumber>();

const model = defineModel<number | undefined>({
	required: true,
	default: undefined
});
const emits = defineEmits(['blur', 'change', 'input', 'focus']);

const id = ref('');
const isFocused = ref(false);
const inputEl = useTemplateRef('inputEl');

const classes = computed(() => {
	const hasValue = !!model.value;

	return {
		'input-row': true,
		filled: hasValue,
		required: props.required,
		invalid: props.error?.length,
		disabled: props.disabled
	};
});

watchEffect(() => {
	if (typeof model.value === 'string') {
		model.value = undefined;
	}
});

onMounted(() => {
	id.value = getRandomId();
});

function handleFocus($event: FocusEvent) {
	emits('focus', $event);
	isFocused.value = true;
}

function handleBlur($event: FocusEvent) {
	emits('blur', $event);
	isFocused.value = false;
}

function handleKeyDown(ev: KeyboardEvent) {
	['e', 'E', '+', '-'].includes(ev.key) && ev.preventDefault();
}

function focusOnInputEl() {
	inputEl.value?.focus();
}
</script>

<style scoped lang="scss"></style>
