<template>
	<section class="layout-wrapper">
		<p class="section-title">
			<span>Предоставляем</span>
			<span class="color"> множество услуг</span>
		</p>

		<ul>
			<li v-for="item in SERVICES" :key="item.name" class="service">
				<p class="name">{{ item.name }}</p>

				<p class="price">
					<UIDIcon name="pin" />
					<span>{{ item.price }}</span>
				</p>

				<p class="description d-block-gte-1024">
					{{ item.description }}
				</p>

				<div class="btn-wrapper">
					<button class="btn-arrow" type="button">
						<UIDIcon name="arrow-up-right" />
					</button>
				</div>
			</li>

			<li class="order-form">
				<p class="title">
					<span>Не нашли то что нужно? </span>
					<span class="d-inline-lt-1024">Оставьте заявку.</span>
				</p>

				<form @submit.prevent>
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

					<button type="button" class="btn-submit">
						Оставить заявку
					</button>
				</form>
			</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
import { SERVICES } from '@/common/constants';

import { useServiceOrderForm } from '@/composables/useServiceOrderForm';

const value = ref('');

const { handleSubmit, nameField, phoneField, validate } = useServiceOrderForm();
</script>

<style lang="scss" scoped>
section {
	margin-top: 60px;
	--btn-arrow-size: 35px;
	--btn-arrow-gap: 6px;

	--btn-wrapper-size: calc(var(--btn-arrow-size) + var(--btn-arrow-gap));
}

.section-title {
	max-width: 243px;

	@include screen1024 {
		max-width: 420px;
	}

	@include screen1440 {
		max-width: 578px;
	}
}

.service {
	padding: 16px;
	position: relative;
	margin-top: 20px;
	border-radius: 20px;
	color: #2b2b2b;

	&::before,
	&::after {
		z-index: -1;
		content: '';
		position: absolute;
		background-color: #cfd2dd;
	}

	&::before {
		top: 0;
		left: 0;
		height: 100%;
		border-radius: 20px;
		border-bottom-right-radius: 0;
		width: calc(100% - var(--btn-wrapper-size));
	}

	&::after {
		bottom: 0;
		right: 0;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		width: var(--btn-wrapper-size);
		height: calc(100% - var(--btn-wrapper-size));
	}

	&:nth-of-type(even) {
		&::before,
		&::after {
			background-color: #f1f2f6;
		}

		.btn-wrapper::before {
			background-color: #f1f2f6;
		}
	}
}

.name {
	font-weight: 500;
	font-size: 18px;
	line-height: 120%;
}

.price {
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	gap: 8px;
	color: #4a6ffe;
	font-weight: 600;
	font-size: 20px;
	line-height: 28px;
	margin-top: 10px;

	.icon {
		color: #428dff;
	}
}

.btn-wrapper {
	@include useFixedSize(var(--btn-wrapper-size), var(--btn-wrapper-size));
	background-color: #ffffff;
	border-bottom-left-radius: 13px;
	display: flex;
	align-items: flex-start;
	justify-content: flex-end;
	position: absolute;
	top: 0;
	right: 0;

	&::before {
		content: '';
		position: absolute;
		left: -10px;
		bottom: -10px;
		width: var(--btn-arrow-size);
		height: var(--btn-arrow-size);
		background-color: #cfd2dd;
		z-index: -1;
	}

	.btn-arrow {
		@include useFixedSize(var(--btn-arrow-size), var(--btn-arrow-size));
		border: 1px solid black;
		border-radius: 100%;
	}
}

.description {
	font-weight: 400;
	font-size: 20px;
	line-height: 28px;
	color: #2b2b2b;
	margin-top: 50px;
}

.order-form {
	padding: 16px;
	color: #ffffff;
	border-radius: 20px;
	margin-top: 26px;
	background-color: #4b6efd;

	.title {
		font-weight: 600;
		font-size: 24px;
		line-height: 40px;
		max-width: 310px;
	}

	form {
		margin-top: 24px;
		display: flex;
		flex-direction: column;
		gap: 12px;

		.btn-submit {
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ffffff;
			background-color: #1d1d1d;
			height: 56px;
			border-radius: 32px;
			font-weight: 700;
			font-size: 18px;
			line-height: 24px;
		}
	}
}

@include screen1024 {
	ul {
		margin-top: 30px;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: auto;
		column-gap: 20px;
		row-gap: 20px;
	}

	.service,
	.order-form {
		padding: 30px;
		margin-top: 0;
	}
}

@include screen1440 {
	section {
		margin-top: 106px;
		--btn-arrow-size: 60px;
		--btn-arrow-gap: 10px;
	}

	.name {
		font-size: 32px;
		line-height: 120%;
	}

	.price {
		font-size: 28px;
		line-height: 28px;
		margin-top: 20px;
	}

	ul {
		column-gap: 30px;
		row-gap: 30px;
	}

	.service {
		padding: 50px;
	}

	.btn-wrapper {
		border-bottom-left-radius: 20px;
	}

	.order-form {
		padding: 50px;

		.title {
			font-size: 32px;
			max-width: unset;
		}

		form {
			.btn-submit {
				font-weight: 700;
				font-size: 18px;
				line-height: 24px;
				width: fit-content;
				padding-inline: 58px;
				margin-top: 24px;
			}
		}
	}
}
</style>
