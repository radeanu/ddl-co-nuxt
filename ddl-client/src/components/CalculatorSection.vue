<template>
	<section id="calculator" class="layout-wrapper">
		<p class="section-title">
			<span>Рассчитайте</span>
			<span class="color"> стоимость услуги</span>
		</p>

		<form @submit.prevent class="form">
			<div class="form-body">
				<p class="form-title">
					Введите параметры и узнайте стоимость (приблизительно)
				</p>

				<div class="inputs">
					<UIDDropdown
						name="type"
						track-by="value"
						placeholder="Вид уборки"
						v-model="cleaningTypeField.value.value"
						:max="1"
						:options="CLEANING_TYPES"
						:error="cleaningTypeField.errorMessage.value"
					/>

					<UIDDropdown
						name="place"
						placeholder="Тип помещения"
						track-by="value"
						:max="1"
						v-model="placeTypeField.value.value"
						:options="PLACE_TYPES"
						:error="placeTypeField.errorMessage.value"
					/>

					<UIDInputNumber
						v-model="areaField.value.value"
						:error="areaField.errorMessage.value"
						name="area"
						placeholder="Метраж"
					>
						<template #right>
							<span class="input-hint">м²</span>
						</template>
					</UIDInputNumber>

					<UIDDropdown
						class="d-block-lt-1440"
						name="other"
						placeholder="Дополнительные услуги"
						track-by="value"
						v-model="otherField.value.value"
						:options="OTHER_SERVICES"
						:error="otherField.errorMessage.value"
					/>

					<UIDCheckboxSelect
						class="d-block-gte-1440 services-select"
						:options="OTHER_SERVICES"
						name="other"
						track-by="value"
						v-model="otherField.value.value"
						:error="otherField.errorMessage.value"
					>
						<template #label>
							<p class="label">Дополнительные услуги</p>
						</template>

						<template #option="{ option }">
							<span>{{ option.name }}</span>
						</template>
					</UIDCheckboxSelect>
				</div>
			</div>

			<div class="form-total">
				<div class="total">
					<p class="total-amount">
						<span>Итоговая стоимость</span>
						<b class="amount">
							<span v-if="total > 0">{{ total }} ₽</span>
							<span v-else>~</span>
						</b>
					</p>

					<p class="total-hint">*Минимальная сумма заказа 3 500 ₽</p>
				</div>

				<p class="form-hint2">
					*Указанная стоимость является ориентировочной
				</p>

				<button
					type="submit"
					class="btn-submit focusable"
					@click="handleSubmit"
				>
					Оставить заявку
				</button>
			</div>
		</form>

		<CalculatorSubmitModal
			v-if="dSubmitModal"
			v-bind="payload"
			:total
			@close="dSubmitModal = false"
		/>
	</section>
</template>

<script setup lang="ts">
import {
	CLEANING_TYPES,
	PLACE_TYPES,
	OTHER_SERVICES
} from '@/common/constants';

import { useCalculator } from '@/composables/useCalculator';
import { useCalculatorForm } from '@/composables/useCalculatorForm';

const { calculate } = useCalculator();

const total = ref<number>(0);
const dSubmitModal = ref(false);

const { validate, areaField, cleaningTypeField, otherField, placeTypeField } =
	useCalculatorForm();

const payload = computed(() => {
	return {
		cl_type: cleaningTypeField.value?.value?.[0]?.value,
		area_type: placeTypeField.value?.value?.[0]?.value,
		area: areaField.value?.value,
		services: otherField.value.value?.map((v) => v.value) ?? []
	};
});

watchEffect(async () => {
	total.value = await calculate(payload.value);
});

async function handleSubmit() {
	const res = await validate();
	if (!res.valid) return;

	dSubmitModal.value = true;
}
</script>

<style lang="scss" scoped>
section {
	margin-top: 50px;
}

.form {
	margin-top: 24px;
}

.form-body {
	padding: 16px;
	border-radius: 16px;
	background-color: #f0f3f5;
}

.inputs {
	margin-top: 16px;
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.form-title {
	font-weight: 500;
	font-size: 18px;
	line-height: 120%;
}

.form-total {
	border-radius: 16px;
	display: flex;
	flex-direction: column;
	gap: 12px;
	color: #ffffff;
	padding: 16px;
	background-color: #638fff;
	margin-top: 12px;
	position: sticky;
	top: 100px;

	.total {
		border-radius: 16px;
		padding: 16px;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;

		.total-amount {
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;
			color: #333436;
			font-weight: 500;
			font-size: 18px;
			line-height: 24px;
			gap: 10px;
			padding-bottom: 10px;
			border-bottom: 1px solid #b9cafd;
		}

		.amount {
			font-weight: 600;
			color: #638fff;
		}

		.total-hint {
			font-weight: 400;
			font-size: 12px;
			line-height: 18px;
			color: #ff2d2d;
			margin-top: 4px;
		}
	}

	.form-hint2 {
		font-weight: 400;
		font-size: 12px;
		line-height: 18px;
		color: #ffffff;
	}
}

.btn-submit {
	height: 44px;
	border-radius: 32px;
	background-color: #ffffff;
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	color: #1a1a1a;
}

.services-select {
	grid-column: 1 / 4;

	.label {
		font-size: 22px;
		line-height: 32px;
	}

	::v-deep(ul) {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		column-gap: 10px;
		row-gap: 10px;
		margin-top: 24px;
		align-items: center;

		@include useFont(tmdm);
		font-weight: 400;
	}
}

@include screen768 {
	.form {
		display: grid;
		grid-template-columns: 1fr 40%;
		column-gap: 20px;
		align-items: flex-start;
	}

	.form-total {
		margin-top: 0;
	}
}

@include screen1240 {
	.form {
		grid-template-columns: 1fr 35%;
	}

	.form-body {
		padding-inline: 30px;
		padding-bottom: 30px;
	}

	.inputs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
	}
}

@include screen1440 {
	.form-title {
		font-size: 22px;
		line-height: 32px;
	}

	.inputs {
		grid-template-columns: 1fr 1fr 1fr;
	}

	.form-total {
		.total {
			.total-amount {
				font-size: 24px;
				line-height: 32px;
			}

			.total-hint {
				font-size: 16px;
				line-height: 24px;
			}
		}

		.form-hint2 {
			font-size: 16px;
			line-height: 24px;
		}
	}

	.btn-submit {
		font-size: 18px;
		line-height: 24px;
	}
}

@include screen1900 {
	.form {
		display: grid;
		grid-template-columns: 1fr 32%;
		column-gap: 33px;
		align-items: flex-start;
	}

	.form-body {
		padding: 50px;
	}

	.form-title {
		font-size: 24px;
		line-height: 32px;
	}

	.inputs {
		margin-top: 24px;
	}

	.services-select {
		margin-top: 20px;

		.label {
			font-size: 24px;
			line-height: 32px;
		}
	}

	.form-total {
		padding: 50px;
		gap: 23px;

		.total {
			padding: 30px;

			.total-hint {
				margin-top: 6px;
			}
		}
	}

	.btn-submit {
		height: 64px;
	}
}
</style>
