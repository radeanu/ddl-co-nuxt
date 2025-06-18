<template>
	<UIDModal class="modal" @close="$emit('close')">
		<div class="header">
			<p class="title">{{ 'Оставьте заявку\n и мы свяжемся с вами' }}</p>
			<button type="button" class="close-btn" @click="$emit('close')">
				<UIDIcon name="x-close" />
			</button>
		</div>

		<p
			v-if="submitResult.submitted && submitResult.success"
			class="success"
		>
			{{ submitResult.message }}
		</p>

		<div v-else>
			<form @submit.prevent class="form">
				<UIDInputText
					name="name"
					placeholder="Имя"
					v-model="nameField.value.value"
					:error="nameField.errorMessage.value"
				/>

				<UIDInputText
					name="phone"
					placeholder="Телефон"
					v-model="phoneField.value.value"
					:error="phoneField.errorMessage.value"
				/>

				<UIDInputTextarea
					name="comment"
					placeholder="Напишите комментарий"
					v-model="commentField.value.value"
					:error="commentField.errorMessage.value"
					auto-resize
					:rows="4"
					:max-rows="10"
				/>

				<p
					class="error"
					v-if="submitResult.submitted && !submitResult.success"
				>
					{{ submitResult.message }}
				</p>

				<button
					type="submit"
					class="btn-submit focusable"
					@click="handleSubmit"
					:disabled="loading.isLoading.value"
				>
					Отправить
				</button>
			</form>

			<p class="form__agreement">
				Нажимая на кнопку, я соглашаюсь с политикой конфиденциальности
			</p>
		</div>
	</UIDModal>
</template>

<script setup lang="ts">
import { API_RESPONSE } from '@/common/constants';
import useYmTriggers from '@/composables/useYmTriggers';
import { useCalcSubmitForm } from '@/composables/useCalcSubmitForm';

const props = defineProps<{
	cl_type: string;
	area_type: string;
	area: number;
	services: string[];
	total: number;
}>();

const $emit = defineEmits(['close']);

const ymTriggers = useYmTriggers();
const loading = useLoadingIndicator();
const runtimeConfig = useRuntimeConfig();
const { commentField, nameField, phoneField, validate, handleReset } =
	useCalcSubmitForm();

const submitResult = ref({
	submitted: false,
	success: false,
	message: ''
});

async function handleSubmit() {
	try {
		const res = await validate();
		if (!res.valid) return;

		submitResult.value.submitted = false;

		loading.start();

		await $fetch('/api/order', {
			baseURL: runtimeConfig.public.API_URL,
			method: 'POST',
			body: {
				name: nameField.value.value,
				phone: phoneField.value.value,
				comment: commentField.value.value,
				cl_type: props.cl_type,
				area_type: props.area_type,
				area: props.area,
				calc_sum: props.total,
				services: props.services
			}
		});

		ymTriggers.hitNewOrder();

		submitResult.value.submitted = true;
		submitResult.value.success = true;
		submitResult.value.message = API_RESPONSE.success;
	} catch (error) {
		console.error(error);
		submitResult.value.submitted = true;
		submitResult.value.success = false;
		submitResult.value.message = API_RESPONSE.error;
	} finally {
		loading.finish();

		setTimeout(() => {
			submitResult.value.submitted = false;

			if (submitResult.value.success) {
				handleReset();
			}
		}, 10000);
	}
}
</script>

<style lang="scss" scoped>
.modal {
	::v-deep(.modal-wrapper) {
		position: relative;
	}

	::v-deep(.modal-content) {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		background-color: #ffffff;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		padding: 18px 12px;
		min-height: 250px;
	}
}

.header {
	position: relative;

	.title {
		font-weight: 500;
		font-size: 18px;
		line-height: 120%;
		white-space: pre-line;
		text-align: center;
		width: 100%;
	}

	.close-btn {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		@include useFixedSize(30px, 30px);
		color: #4c4c4c;

		--icon-width: 30px;
		--icon-height: 30px;
	}
}

.form {
	margin-top: 20px;
	display: flex;
	gap: 20px;
	flex-direction: column;
}

.btn-submit {
	height: 44px;
	border-radius: 32px;
	background-color: #638fff;
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	color: #ffffff;
}

.form__agreement {
	margin-top: 20px;
	font-weight: 400;
	font-size: 12px;
	line-height: 18px;
}

.error {
	@include useFont(txsr);
	color: #ea0805;
}

.success {
	@include useFont(tmdr);
	margin-top: 20px;
	text-align: center;
}
</style>
