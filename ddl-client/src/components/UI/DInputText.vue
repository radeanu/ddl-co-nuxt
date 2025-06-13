<template>
	<div class="input-wrapper">
		<div :class="classes" @click="focusOnInputEl">
			<slot name="left" />

			<input
				:id
				:name
				:disabled
				:required
				:placeholder
				type="text"
				ref="inputEl"
				class="input"
				v-model.trim="model"
				@blur="handleBlur"
				@change="emits('change', $event)"
				@input="emits('input', $event)"
				@focus="handleFocus($event)"
			/>

			<slot name="right" />
		</div>

		<p v-if="error && !disabled" class="input-error">{{ error }}</p>
	</div>
</template>

<script setup lang="ts">
import { getRandomId } from '@/utils/index';

export type DInputText = {
	name?: string;
	disabled?: boolean;
	required?: boolean;
	placeholder?: string;
	error?: string;
};

const props = defineProps<DInputText>();

const model = defineModel<string>({ required: true, default: '' });
const emits = defineEmits(['blur', 'change', 'input', 'focus']);

const id = ref('');
const isFocused = ref(false);
const inputEl = useTemplateRef('inputEl');

const classes = computed(() => {
	const hasValue = model.value.length;

	return {
		'input-row': true,
		filled: hasValue,
		required: props.required,
		invalid: props.error?.length,
		disabled: props.disabled
	};
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

function focusOnInputEl() {
	inputEl.value?.focus();
}
</script>

<style scoped lang="scss"></style>
