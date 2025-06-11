<template>
	<div :class="classes">
		<slot name="label">
			<p>{{ label }}</p>
		</slot>

		<ul>
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
					:name="item.meta.id"
				>
					<template #label>
						<slot
							name="option"
							:option="item.option"
							:meta="item.meta"
						>
							<span>{{ item.option ?? idx }}</span>
						</slot>
					</template>
				</UIDCheckbox>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts" generic="T extends Option">
export type Option = {};

type DCheckboxSelect = {
	options: T[];
	trackBy?: keyof T;
	name?: string;
	max?: number;
	disabled?: boolean;
	required?: boolean;
	label?: string;
	error?: string;
};

const props = defineProps<DCheckboxSelect>();
const $emit = defineEmits<{
	(e: 'select', value: T): void;
	(e: 'remove', value: T): void;
	(e: 'click-option', value: T): void;
}>();

const model = defineModel<T[]>({ required: false, default: [] });

const classes = computed(() => {
	const hasValue = model.value.length;

	return {
		filled: hasValue,
		required: props.required,
		invalid: props.error?.length,
		disabled: props.disabled
	};
});

const reachedLimit = computed(() => {
	if (props.max === undefined) return false;

	return model.value.length === props.max;
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

function _checkIsSameOption(opt: T, val: T) {
	if (!props.trackBy) {
		return val === opt;
	}

	return val[props.trackBy] === opt[props.trackBy];
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
</script>

<style lang="scss" scoped></style>
