<template>
	<div class="input-wrapper">
		<div
			:class="classes"
			@mouseenter.self="isHovered = true"
			@mouseleave.self="isHovered = false"
			@click="focusOnInputEl"
		>
			<textarea
				ref="inputEl"
				v-model.trim="model"
				:name="name"
				:cols="cols"
				:rows="rows"
				:disabled="disabled"
				:placeholder="placeholder"
				:spellcheck="spellcheck"
				:wrap="wrap"
				@blur="handleBlur"
				@change="emits('change', $event)"
				@input="onInput($event as InputEvent)"
				@focus="handleFocus"
			/>
		</div>

		<p v-if="error && !disabled" class="input-error">{{ error }}</p>
	</div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

interface IProps {
	placeholder?: string;
	name?: string;
	error?: string | undefined;
	disabled?: boolean;
	rows?: number;
	cols?: number;
	spellcheck?: boolean;
	wrap?: 'soft' | 'hard';
	autoResize?: boolean;
	maxRows?: number;
	required?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
	rows: 1,
	wrap: 'soft',
	maxRows: 5
});

const model = defineModel<string>({ required: true, default: '' });
const emits = defineEmits(['blur', 'change', 'input', 'focus']);

const isFocused = ref(false);
const isHovered = ref(false);
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

function onInput($event: InputEvent) {
	emits('input', $event);

	if (!props.autoResize || !inputEl.value) return;

	const maxHeight = props.maxRows * 24 + 32;
	const minHeight = props.rows * 24 + 32;

	const height = inputEl.value.style.height.replace('px', '');

	if (+height < maxHeight) {
		inputEl.value.style.height = minHeight + 'px';
		inputEl.value.style.height = inputEl.value.scrollHeight + 'px';
		inputEl.value.style.overflowY = 'hidden';
	} else {
		inputEl.value.style.overflowY = 'auto';
	}
}
</script>

<style scoped lang="scss">
::v-deep(.input-row) {
	height: auto;
}

::v-deep(.filled) {
	textarea {
		color: #1a1a1a;
	}
}

textarea {
	width: 100%;
	height: 100%;
	overflow-wrap: break-word;
	padding: 16px;
	color: #5d5d5d;
}
</style>
