<template>
	<div class="input-wrapper" v-click-outside="handleClickOutside">
		<input type="text" hidden :value="model" :name />

		<div :class="classes" tabindex="0" @click="toggleDisplayOptions">
			<span>
				<span>{{ placeholder }}</span>

				<span v-if="model.length" class="sel-count">
					({{ model.length }})
				</span>
			</span>

			<UIDIcon name="chevron-down" class="trigger-icon" />
		</div>

		<ul v-if="isFocused" class="options">
			<li
				v-for="(item, idx) in formattedOptions"
				:key="item.meta.id"
				:class="{
					option: true,
					'option-disabled': reachedLimit && !item.meta.selected
				}"
				@click.prevent="handleClickOption(item.option)"
			>
				<UIDCheckbox
					:model-value="item.meta.selected"
					:disabled="reachedLimit && !item.meta.selected"
					:name="item.meta.id"
				>
					<template #label>
						<slot
							name="option"
							:option="item.option"
							:meta="item.meta"
						>
							<span>{{ item.option?.name ?? idx }}</span>
						</slot>
					</template>
				</UIDCheckbox>
			</li>
		</ul>

		<p v-if="error && !disabled && !isFocused" class="input-error">
			{{ error }}
		</p>
	</div>
</template>

<script setup lang="ts" generic="T extends Option">
import { getRandomId } from '@/utils/index';

export type Option = {
	name?: string;
};

type DDropdown = {
	options: T[];
	trackBy?: keyof T;
	name?: string;
	max?: number;
	disabled?: boolean;
	required?: boolean;
	placeholder?: string;
	error?: string;
};

const props = defineProps<DDropdown>();
const $emit = defineEmits<{
	(e: 'select', value: T): void;
	(e: 'remove', value: T): void;
	(e: 'click-option', value: T): void;
}>();

const model = defineModel<T[]>({ required: false, default: [] });

const isFocused = ref(false);

const classes = computed(() => {
	const hasValue = model.value.length;

	return {
		'input-row': true,
		'dropdown-trigger': true,
		filled: hasValue,
		required: props.required,
		invalid: props.error?.length,
		disabled: props.disabled
	};
});

const formattedOptions = computed(() => {
	return props.options.map((opt) => {
		const selected = model.value.some((val) => {
			return _checkIsSameOption(opt, val);
		});

		return {
			option: opt,
			meta: {
				id: getRandomId(),
				selected
			}
		};
	});
});

const reachedLimit = computed(() => {
	if (props.max === undefined) return false;

	return model.value.length === props.max;
});

function _checkIsSameOption(opt: T, val: T) {
	if (!props.trackBy) {
		return val === opt;
	}

	return val[props.trackBy] === opt[props.trackBy];
}

function toggleDisplayOptions() {
	isFocused.value = !isFocused.value;
}

function handleClickOption(opt: T) {
	const exists = model.value.some((val) => {
		return _checkIsSameOption(opt, val);
	});

	if (exists) {
		return handleRemoveOption(opt);
	}

	$emit('click-option', JSON.parse(JSON.stringify(opt)));
	handleSelectOption(opt);
}

function handleSelectOption(opt: T) {
	if (reachedLimit.value) return;

	model.value = [...model.value, opt];
	$emit('select', JSON.parse(JSON.stringify(opt)));
}

function handleRemoveOption(opt: T) {
	model.value = model.value.filter((v) => {
		return !_checkIsSameOption(opt, v);
	});

	$emit('remove', JSON.parse(JSON.stringify(opt)));
}

function handleClickOutside() {
	isFocused.value = false;
}
</script>

<style scoped lang="scss">
.input-wrapper {
	position: relative;
}

.dropdown-trigger {
	cursor: pointer;
	padding: 16px 20px;
	color: #5d5d5d;
	gap: 12px;

	.trigger-icon {
		color: #5d5d5d;
		transition: all 0.2s;
		@include useFixedSize(24px, 24px);
	}

	.sel-count {
		color: #4b6efd;
	}

	&:focus-within {
		.trigger-icon {
			transform: rotate(180deg);
		}
	}
}

.options {
	border: 1px solid #d9d9d9;
	background-color: #ffffff;
	border-radius: 12px;
	padding-block: 8px;
	position: absolute;
	width: 100%;
	top: 64px;
	z-index: var(--z-index-dropdown-list);
	max-height: 320px;
	overflow-y: auto;

	.option {
		padding: 8px 16px;
		background-color: #ffffff;

		&:hover {
			background-color: #f2f2f2;
		}
	}

	.option-disabled {
		opacity: 0.7;
		pointer-events: none;
	}
}
</style>
