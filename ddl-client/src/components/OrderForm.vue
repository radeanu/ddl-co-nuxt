<template>
	<div class="order-form">
		<div class="header">
			<p class="title">{{ 'Оставьте заявку\n и мы свяжемся с вами' }}</p>
		</div>

		<p
			v-if="submitResult.submitted && submitResult.success"
			class="success"
		>
			{{ submitResult.message }}
		</p>

		<div v-else>
			<form @submit.prevent class="form">
				<input
					type="text"
					name="website"
					v-model="honeypotField.value.value"
					style="
						position: absolute;
						left: -9999px;
						width: 1px;
						height: 1px;
					"
					tabindex="-1"
					autocomplete="off"
				/>

				<div class="input-wrapper">
					<div class="service-select-wrapper">
						<label
							v-if="!serviceTypeField.value.value"
							for="serviceType"
						>
							Вид услуги
						</label>
						<select
							id="serviceType"
							v-model="serviceTypeField.value.value"
							name="serviceType"
							class="service-select"
							:class="{
								invalid: serviceTypeField.errorMessage.value,
								filled: serviceTypeField.value.value
							}"
						>
							<option
								v-for="item in SERVICE_TYPES"
								:key="item.value"
								:value="item.value"
							>
								{{ item.name }}
							</option>
						</select>
					</div>
					<p
						v-if="serviceTypeField.errorMessage.value"
						class="input-error"
					>
						{{ serviceTypeField.errorMessage.value }}
					</p>
				</div>

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
					placeholder="Комментарий"
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
	</div>
</template>

<script setup lang="ts">
import { API_RESPONSE } from '@/common/constants';
import useYmTriggers from '@/composables/useYmTriggers';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { useOrderForm } from '@/composables/useOrderForm';
import { SERVICE_TYPES } from '@/common/constants';

const storage = useLocalStorage();
const ymTriggers = useYmTriggers();
const loading = useLoadingIndicator();
const runtimeConfig = useRuntimeConfig();
const {
	serviceTypeField,
	commentField,
	nameField,
	phoneField,
	honeypotField,
	validate,
	handleReset
} = useOrderForm();

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

		const location = storage.getItem('loc');

		await $fetch('/api/order/call', {
			baseURL: runtimeConfig.public.API_URL,
			method: 'POST',
			body: {
				location,
				name: nameField.value.value,
				phone: phoneField.value.value,
				comment: commentField.value.value,
				service_type: serviceTypeField.value.value,
				website: honeypotField.value.value
			}
		});

		ymTriggers.hitNewOrderCallType();

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
.order-form {
	background-color: #ffffff;
	border-radius: 20px;
	padding: 32px;
	box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
		0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.header {
	position: relative;

	.title {
		font-weight: 500;
		font-size: 24px;
		line-height: 120%;
		white-space: pre-line;
		text-align: center;
		width: 100%;
		margin-bottom: 8px;
	}
}

.form {
	margin-top: 24px;
	display: flex;
	gap: 24px;
	flex-direction: column;
}

.input-wrapper {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.service-select-wrapper {
	position: relative;
	width: 100%;

	label {
		font-size: 14px;
		line-height: 20px;
		color: #5d5d5d;
		position: absolute;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 16px;
		line-height: 20px;
	}
}

.service-select {
	width: 100%;
	height: 56px;
	border-radius: 12px;
	border: 1px solid #d9d9d9;
	background-color: #ffffff;
	padding: 16px 20px;
	font-size: 16px;
	line-height: 24px;
	color: #5d5d5d;
	appearance: none;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%235d5d5d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: right 16px center;
	background-size: 24px;
	cursor: pointer;
	transition: all 0.2s;

	&:focus {
		outline: none;
		border-color: #638fff;
	}

	&.filled {
		color: #1a1a1a;
	}

	&.invalid {
		border-color: #ea0805;
	}

	option {
		color: #1a1a1a;
	}

	option[value=''][disabled] {
		color: #5d5d5d;
	}
}

.btn-submit {
	height: 48px;
	border-radius: 32px;
	background-color: #638fff;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	color: #ffffff;
}

.form__agreement {
	margin-top: 24px;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
}

.error {
	@include useFont(txsr);
	color: #ea0805;
}

.success {
	@include useFont(tmdr);
	margin-top: 24px;
	text-align: center;
	font-size: 18px;
	line-height: 24px;
}

.input-error {
	@include useFont(txsr);
	color: #ea0805;
	padding-left: 16px;
}
</style>
