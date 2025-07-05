<template>
	<section id="reviews" class="layout-wrapper" :class="{ page }">
		<h2 class="section-title">
			<UIDLink title="Отзывы клиентов" aria-label="Отзывы" to="/">
				<span class="color">Отзывы</span>
				<span> клиентов</span>
			</UIDLink>
		</h2>

		<ul class="left reviews">
			<li
				v-for="(item, idx) in reviews"
				:key="item.name + idx"
				class="review-card"
			>
				<div class="name">
					<b>{{ item.name }}</b>

					<UIDInputRating
						:count="5"
						:min="1"
						:max="5"
						disabled
						:model-value="item.rating"
					/>
				</div>

				<p class="comment">{{ item.review }}</p>
			</li>

			<p v-if="!reviews.length">Отзывы пока не найдены</p>
		</ul>

		<div class="right">
			<form @submit.prevent class="form">
				<UIDInputText
					name="name"
					placeholder="Имя"
					v-model="nameField.value.value"
					:error="nameField.errorMessage.value"
				/>

				<UIDInputTextarea
					name="review"
					placeholder="Напишите отзыв"
					v-model="reviewField.value.value"
					:error="reviewField.errorMessage.value"
					auto-resize
					:rows="4"
					:max-rows="10"
				/>

				<UIDInputRating
					:count="5"
					:min="1"
					:max="5"
					label="Укажите оценку"
					:error="ratingField.errorMessage.value"
					v-model="ratingField.value.value"
				/>

				<p
					v-if="submitResult.submitted && !submitResult.success"
					class="error"
				>
					{{ submitResult.message }}
				</p>

				<p
					v-if="submitResult.submitted && submitResult.success"
					class="result"
				>
					{{ submitResult.message }}
				</p>

				<button
					type="submit"
					class="btn-submit focusable"
					@click="handleSubmit"
					:disabled="loading.isLoading.value"
				>
					Оставить отзыв
				</button>
			</form>
		</div>
	</section>
</template>

<script setup lang="ts">
import { API_RESPONSE } from '@/common/constants';
import { useReviewForm } from '@/composables/useReviewForm';
import { useLocalStorage } from '@/composables/useLocalStorage';

defineProps<{ page?: boolean }>();

const submitResult = ref({
	submitted: false,
	success: false,
	message: ''
});

const storage = useLocalStorage();
const loading = useLoadingIndicator();
const runtimeConfig = useRuntimeConfig();
const { handleReset, nameField, ratingField, reviewField, validate } =
	useReviewForm();

type Review = {
	name: string;
	review: string;
	rating: number;
	createdAt: string;
	location: string;
};

const { data: reviews } = await useAsyncData<Review[]>(
	'reviews',
	() =>
		$fetch('/api/review', {
			baseURL: runtimeConfig.public.API_URL,
			method: 'GET'
		}),
	{ default: () => [] }
);

async function handleSubmit() {
	try {
		const res = await validate();
		if (!res.valid) return;

		submitResult.value.submitted = false;

		loading.start();

		const location = storage.getItem('loc');

		await $fetch('/api/review', {
			baseURL: runtimeConfig.public.API_URL,
			method: 'POST',
			body: {
				location,
				name: nameField.value.value,
				review: reviewField.value.value,
				rating: ratingField.value.value
			}
		});

		submitResult.value.submitted = true;
		submitResult.value.success = true;
		submitResult.value.message = API_RESPONSE.reviewSuccess;
	} catch (error) {
		console.error(error);
		submitResult.value.submitted = true;
		submitResult.value.success = false;
		submitResult.value.message = API_RESPONSE.reviewError;
	} finally {
		loading.finish();
		if (submitResult.value.success) {
			handleReset();
		}

		setTimeout(() => {
			submitResult.value.submitted = false;
		}, 50000);
	}
}
</script>

<style lang="scss" scoped>
section {
	margin-top: 60px;
}

.page {
	margin: 0;
}

.section-title {
	max-width: 221px;
}

.result {
	@include useFont(tmdr);
}

.error {
	@include useFont(txsr);
	color: #ea0805;
}

.form {
	margin-top: 20px;
	display: flex;
	gap: 20px;
	flex-direction: column;
}

.btn-submit {
	margin-top: 20px;
	height: 44px;
	border-radius: 32px;
	background-color: #638fff;
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	color: #ffffff;
	width: 100%;
}

.reviews {
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 20px;
}

.review-card {
	border-radius: 16px;
	padding: 16px;
	background-color: #eef3ff;
	--icon-width: 20px;
	--icon-height: 20px;

	&:nth-of-type(even) {
		background-color: #f0f3f5;
	}

	.name {
		display: flex;
		gap: 10px;
		flex-direction: column;
	}

	.comment {
		margin-top: 20px;
	}
}

@include screen768 {
	.reviews {
		gap: 20px;
	}
}

@include screen1024 {
	.layout-wrapper {
		display: grid;
		grid-template-columns: 35% 1fr;
		column-gap: 20px;
	}

	.section-title {
		position: absolute;
		min-width: unset;
		max-width: 100%;
		left: var(--layout-pad-x);
	}

	.reviews {
		margin-top: 0;
	}

	.right {
		order: -1;
		margin-top: 80px;
	}

	.form {
		margin-top: 0;
	}
}

@include screen1440 {
	.layout-wrapper {
		column-gap: 33px;
		grid-template-columns: 30% 1fr;
	}

	.section-title {
		max-width: 200px;
	}

	.right {
		margin-top: 180px;
	}

	.reviews {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		column-gap: 20px;
	}
}
</style>
