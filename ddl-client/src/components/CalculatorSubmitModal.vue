<template>
	<UIDModal class="modal" @close="$emit('close')">
		<div class="header">
			<p class="title">{{ 'Оставьте заявку\n и мы свяжемся с вами' }}</p>
			<button type="button" class="close-btn" @click="$emit('close')">
				<UIDIcon name="x-close" />
			</button>
		</div>

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

			<button
				type="submit"
				class="btn-submit focusable"
				@click="handleSubmit"
			>
				Отправить
			</button>
		</form>

		<p class="form__agreement">
			Нажимая на кнопку, я соглашаюсь с политикой конфиденциальности
		</p>
	</UIDModal>
</template>

<script setup lang="ts">
import { useCalcSubmitForm } from '@/composables/useCalcSubmitForm';

const { commentField, nameField, phoneField, validate } = useCalcSubmitForm();

async function handleSubmit() {
	try {
		const res = await validate();
		if (!res.valid) return;
		const payload = {
			name: nameField.value,
			phone: phoneField.value,
			comment: commentField.value
		};
	} catch (error) {
		console.log(error);
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
</style>
