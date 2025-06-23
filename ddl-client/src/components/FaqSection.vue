<template>
	<section id="faq" class="layout-wrapper" :class="{ page }">
		<h2 class="section-title">
			<UIDLink
				title="Вопросы/Ответы"
				aria-label="Вопросы/Ответы"
				to="faq"
			>
				<span>Ответим на все</span>
				<span class="color"> ваши вопросы</span>
			</UIDLink>
		</h2>

		<ul>
			<li v-for="(item, idx) in qa">
				<div
					:class="{ question: true, display: item.display }"
					@click="item.display = !item.display"
				>
					<span class="count">{{ idx + 1 }}</span>
					<span>{{ item.question }}</span>
					<UIDIcon name="arrow-down" />
				</div>

				<p v-show="item.display" class="answer">
					<span></span>
					<span>{{ item.answer }}</span>
					<span></span>
				</p>
			</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
defineProps<{ page?: boolean }>();

const qa = ref([
	{
		display: true,
		question: 'Когда нужно платить?',
		answer: 'Услуги уборки необходимо оплатить по окончанию работ, когда Вы приняли работы и не имеете претензий к качеству оказанных услуг.'
	},
	{
		display: false,
		question: 'Как оплатить услугу?',
		answer: 'Вы можете оплатить наличными или безналичным способом оплаты, с помощью qr-кода.'
	},
	{
		display: false,
		question: 'Сколько времени занимает уборка? ',
		answer: 'Уборка квартиры занимает от 2 - до 6 часов. Сроки напрямую зависят от площади и загрязненности помещения. Бывают случаи, когда клиенту требуется экстра-быстрая уборка, на такой заказ мы добавляем дополнительный персонал, чтобы справиться в срок.'
	},
	{
		display: false,
		question: 'В каких городах вы работаете?',
		answer: 'На данный момент мы работаем в Москве, Ярославле и Херсоне'
	},
	{
		display: false,
		question: 'Есть ли скидки на услуги?',
		answer: 'Да, мы регулярно делаем скидки на услуги, в зависимости от сезона. Скидки постоянным клиентам обговариваются индивидуально.'
	},
	{
		display: false,
		question: 'Могу ли я во время уборки отлучится по работе?',
		answer: 'Процесс уборки контролируется мастером, поэтому вы спокойной можете заняться своими делами и приехать только для принятия выполненных работ. Мы гарантируем сохранность имущества заказчика и несем полную ответственность за своих работников.'
	},
	{
		display: false,
		question:
			'Что делать, если после уборки я обнаружу, что что-то не убрано или убрано не качественно?',
		answer: 'Если вы обнаружите какие-либо недоработки, пожалуйста, свяжитесь с нами в течении 24 часов после уборки, и мы назначим дополнительный визит, чтобы устранить все недочеты бесплатно.'
	},
	{
		display: false,
		question:
			'Нужно ли мне предоставлять уборочные принадлежности или моющие средства?',
		answer: 'Нет. Наша команда привезет все необходимы инструменты и средства для уборки. Однако, если у вас есть специфические средства, которые вы бы хотели, чтобы мы использовали, дайте нам знать заранее.'
	}
]);
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

ul {
	background-color: #f1f2f6;
	padding: 16px;
	border-radius: 20px;
	margin-top: 10px;
}

.question {
	display: grid;
	grid-template-columns: 20px 1fr 22px;
	column-gap: 14px;
	font-weight: 500;
	font-size: 16px;
	line-height: 110%;
	cursor: pointer;
	padding-block: 20px;
	border-bottom: 1px solid #bfbfbf;

	.icon {
		margin-left: auto;
		right: 0;
		transition: all 0.3s ease;
		@include useFixedSize(22px, 22px);
	}

	&:hover {
		color: #000000;
	}

	&.display {
		color: #4b6efd;

		.icon {
			transform: rotate(180deg);
		}
	}

	.count {
		font-weight: 600;
	}
}

.answer {
	display: grid;
	grid-template-columns: 20px 1fr 22px;
	column-gap: 14px;
	margin-top: 16px;
	font-weight: 400;
	font-size: 14px;
	line-height: 120%;
	color: #5e5e5e;
	padding-bottom: 20px;
	border-bottom: 1px solid #bfbfbf;
}

@include screen1024 {
	ul {
		padding: 30px;
	}

	.section-title {
		max-width: 321px;
	}

	.question {
		font-size: 18px;
	}

	.answer {
		font-size: 16px;
	}
}

@include screen1440 {
	section {
		display: grid;
		grid-template-columns: 30% 1fr;
		column-gap: 33px;
	}

	ul {
		padding: 50px;
	}

	.section-title {
		max-width: 521px;
	}

	.question {
		font-size: 24px;
		line-height: 32px;
	}

	.answer {
		font-size: 18px;
		line-height: 24px;
	}
}
</style>
