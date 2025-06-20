<template>
	<section id="services" class="layout-wrapper">
		<h2 class="section-title">
			<span>Предоставляем</span>
			<span class="color"> множество услуг</span>
		</h2>

		<ul>
			<li v-for="item in services" :key="item.name" class="service">
				<h3 class="name">{{ item.name }}</h3>

				<p class="price">
					<UIDIcon name="pin" />
					<span> {{ item.price.label }} </span>
				</p>

				<p class="description d-block-gte-1024">
					{{ item.description }}
				</p>

				<div class="btn-wrapper">
					<button
						class="btn-arrow"
						type="button"
						aria-label="Узнать больше"
					>
						<UIDIcon name="arrow-up-right" />
					</button>
				</div>
			</li>

			<li id="order" class="order-form">
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

					<p v-if="submitResult.submitted" class="result">
						{{ submitResult.message }}
					</p>

					<button
						type="submit"
						class="btn-submit"
						@click="handleSubmit"
					>
						Оставить заявку
					</button>
				</form>
			</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
import useYmTriggers from '@/composables/useYmTriggers';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { useServiceOrderForm } from '@/composables/useServiceOrderForm';
import { CLEANING_TYPES, BASE_PRICE, API_RESPONSE } from '@/common/constants';

const storage = useLocalStorage();
const ymTriggers = useYmTriggers();
const loading = useLoadingIndicator();
const runtimeConfig = useRuntimeConfig();
const { nameField, phoneField, validate, handleReset } = useServiceOrderForm();

const services = CLEANING_TYPES.map((s) => {
	const bse_price = s.price.unit ? BASE_PRICE.unit : BASE_PRICE.area;
	const price_des = s.price.unit ? '/ед.' : '/м2';

	return {
		...s,
		price: {
			...s.price,
			label: `от ${s.price.coef * bse_price} ₽ ${price_des}`
		}
	};
});

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
				phone: phoneField.value.value
			}
		});

		ymTriggers.hitNewOrderCall();

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
	white-space: pre-line;
}

.order-form {
	padding: 16px;
	color: #ffffff;
	border-radius: 20px;
	margin-top: 26px;
	background-color: #638fff;

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
		gap: 18px;

		.btn-submit {
			display: flex;
			align-items: center;
			justify-content: center;
			color: #1a1a1a;
			background-color: #ffffff;
			height: 56px;
			border-radius: 32px;
			font-weight: 600;
			font-size: 18px;
			line-height: 24px;
		}
	}
}

.result {
	@include useFont(tmdr);
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
				font-weight: 600;
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
