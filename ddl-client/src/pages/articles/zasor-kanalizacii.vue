<template>
	<div class="article-page">
		<article class="article-container layout-wrapper">
			<div class="article-hero">
				<div class="article-hero-content">
					<h1 class="article-title">
						Причины засора канализации в квартире: топ-5 ошибок,
						которые совершают все
					</h1>
					<p class="article-intro">
						Засор канализации — одна из самых неприятных бытовых
						проблем, которая может превратить обычный день в хаос.
						Вода не уходит, появляется запах, а иногда и потоп. По
						статистике, до 80% засоров в квартирах вызваны
						человеческим фактором, а не износом труб.
					</p>
				</div>
				<div class="article-hero-image">
					<img
						src="/images/articles/sewer.jpg"
						alt="Прочистка канализации"
						loading="lazy"
					/>
				</div>
			</div>

			<div class="article-layout">
				<div class="article-content">
					<section class="article-section">
						<h2 class="section-title">
							Топ-5 ошибок, ведущих к засорам
						</h2>

						<div class="error-card">
							<div class="error-number">1</div>
							<div class="error-content">
								<h3>Слив жира и масла в раковину</h3>
								<p>
									Горячий жир кажется жидким, но остывая в
									трубах, он затвердевает и образует пробки.
									Добавьте остатки еды — и засор готов. Это
									самая частая причина в кухонных сифонах: жир
									прилипает к стенкам, собирая мусор.
								</p>
							</div>
						</div>

						<div class="error-card">
							<div class="error-number">2</div>
							<div class="error-content">
								<h3>
									Выбрасывание волос и гигиенических средств в
									унитаз
								</h3>
								<p>
									Волосы — натуральный "клей" для засоров в
									ванной. А салфетки, ватные диски или
									прокладки не растворяются в воде, как
									туалетная бумага, и блокируют трубы. Даже
									"смываемые" влажные салфетки часто вызывают
									проблемы в старых системах.
								</p>
							</div>
						</div>

						<div class="error-card">
							<div class="error-number">3</div>
							<div class="error-content">
								<h3>Игнорирование мелкого мусора</h3>
								<p>
									Кофейная гуща, чайные листья, крошки или
									остатки пищи попадают в слив и
									накапливаются. В многоквартирных домах это
									усугубляется общими стояками, где мусор от
									соседей добавляется к вашему.
								</p>
							</div>
						</div>

						<div class="error-card">
							<div class="error-number">4</div>
							<div class="error-content">
								<h3>
									Использование агрессивной химии без меры
								</h3>
								<p>
									Химические средства растворяют засоры, но
									при частом применении разъедают трубы,
									особенно пластиковые, приводя к трещинам и
									новым засорам от осадка. Плюс, они не решают
									проблему накопления органики.
								</p>
							</div>
						</div>
					</section>

					<section class="article-section prevention-section">
						<h2 class="section-title">
							Как предотвратить засоры навсегда
						</h2>

						<div class="prevention-grid">
							<div class="prevention-card">
								<div class="prevention-icon">🚫</div>
								<p>
									Сливайте жир в контейнер для мусора, а не в
									раковину
								</p>
							</div>
							<div class="prevention-card">
								<div class="prevention-icon">🧪</div>
								<p>
									Для профилактики заливайте в слив кипяток с
									содой и уксусом раз в месяц — это натурально
									и эффективно
								</p>
							</div>
							<div class="prevention-card">
								<div class="prevention-icon">💧</div>
								<p>
									Вызовите профессиональную чистку труб
									гидродинамическим методом раз в год: это
									удаляет налет без повреждений
								</p>
							</div>
						</div>
					</section>

					<section class="article-conclusion">
						<h2>Заключение</h2>
						<p>
							Засоры — не неизбежность, а результат привычек.
							Избегайте этих ошибок, и ваша канализация прослужит
							дольше. Если проблема уже возникла, не
							экспериментируйте сами — обратитесь к нам в
							клининговую компанию. Мы устраним засор быстро, с
							гарантией и профилактикой.
						</p>
					</section>
				</div>

				<div class="article-sidebar">
					<div class="sticky-order-form">
						<OrderForm />
					</div>
				</div>
			</div>
		</article>
	</div>
</template>

<script setup lang="ts">
const baseUrl = useRuntimeConfig().public.NUXT_PUBLIC_SITE_URL as string;

useSeoMeta({
	title: 'Причины засора канализации в квартире: топ-5 ошибок | DDL Клининг',
	description:
		'Узнайте о самых распространенных ошибках, которые приводят к засорам канализации, и как их избежать. Профессиональные советы от специалистов.',
	ogTitle: 'Причины засора канализации в квартире: топ-5 ошибок',
	ogDescription:
		'Узнайте о самых распространенных ошибках, которые приводят к засорам канализации, и как их избежать.',
	ogImage: baseUrl + '/images/articles/plumbing.png',
	ogUrl: baseUrl + '/articles/zasor-kanalizacii',
	ogType: 'article'
});

useHead({ htmlAttrs: { lang: 'ru' } });
</script>

<style lang="scss" scoped>
.article-page {
	background-color: #f8f9fa;
	min-height: 100vh;
}

.article-container {
	padding-top: 40px;
	padding-bottom: 80px;
}

.article-hero {
	display: grid;
	grid-template-columns: 1fr;
	gap: 40px;
	margin-bottom: 60px;
	background: linear-gradient(135deg, #638fff 0%, #4b6efd 100%);
	border-radius: 24px;
	padding: 60px;
	color: white;

	@include screen1024 {
		grid-template-columns: 1.2fr 1fr;
		align-items: center;
	}
}

.article-hero-content {
	.article-title {
		font-size: 32px;
		font-weight: 700;
		line-height: 1.2;
		margin-bottom: 24px;

		@include screen768 {
			font-size: 42px;
		}

		@include screen1024 {
			font-size: 48px;
		}
	}

	.article-intro {
		font-size: 18px;
		line-height: 1.6;
		opacity: 0.95;

		@include screen1024 {
			font-size: 20px;
		}
	}
}

.article-hero-image {
	img {
		width: 100%;
		height: auto;
		border-radius: 16px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
	}
}

.article-layout {
	display: grid;
	grid-template-columns: 1fr;
	gap: 40px;

	@include screen1440 {
		grid-template-columns: 1fr 400px;
		gap: 60px;
	}
}

.article-content {
	background-color: white;
	border-radius: 24px;
	padding: 40px 24px;

	@include screen768 {
		padding: 60px;
	}
}

.article-sidebar {
	@include screen1440 {
		position: relative;
	}
}

.sticky-order-form {
	@include screen1440 {
		position: sticky;
		top: 120px;
	}
}

.article-section {
	margin-bottom: 60px;

	&:last-child {
		margin-bottom: 0;
	}
}

.section-title {
	font-size: 28px;
	font-weight: 700;
	color: #1d1d1d;
	margin-bottom: 32px;
	padding-bottom: 16px;
	border-bottom: 3px solid #638fff;

	@include screen768 {
		font-size: 36px;
	}
}

.error-card {
	display: flex;
	gap: 24px;
	margin-bottom: 32px;
	padding: 28px;
	background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
	border-radius: 16px;
	border-left: 4px solid #638fff;
	transition: transform 0.3s ease, box-shadow 0.3s ease;

	&:hover {
		transform: translateX(8px);
		box-shadow: 0 8px 24px rgba(99, 143, 255, 0.15);
	}

	.error-number {
		flex-shrink: 0;
		width: 48px;
		height: 48px;
		background: linear-gradient(135deg, #638fff 0%, #4b6efd 100%);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		font-weight: 700;
	}

	.error-content {
		h3 {
			font-size: 20px;
			font-weight: 600;
			color: #1d1d1d;
			margin-bottom: 12px;
			line-height: normal;

			@include screen768 {
				font-size: 24px;
			}
		}

		p {
			font-size: 16px;
			line-height: 1.7;
			color: #454545;

			@include screen768 {
				font-size: 18px;
			}
		}
	}
}

.prevention-section {
	background: linear-gradient(135deg, #e7ffe7 0%, #cdffcd 100%);
	padding: 40px;
	border-radius: 20px;
	margin-bottom: 60px;
}

.prevention-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 24px;

	@include screen768 {
		grid-template-columns: repeat(3, 1fr);
	}
}

.prevention-card {
	background: white;
	padding: 32px;
	border-radius: 16px;
	text-align: center;
	transition: transform 0.3s ease, box-shadow 0.3s ease;

	&:hover {
		transform: translateY(-8px);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
	}

	.prevention-icon {
		font-size: 48px;
		margin-bottom: 16px;
	}

	p {
		font-size: 16px;
		line-height: 1.6;
		color: #454545;
		margin-top: 20px;
	}
}

.article-conclusion {
	text-align: center;
	padding: 40px;
	background: linear-gradient(135deg, #f8f9fa 0%, #e7e9eb 100%);
	border-radius: 20px;

	h2 {
		font-size: 32px;
		font-weight: 700;
		color: #1d1d1d;
		margin-bottom: 24px;
	}

	p {
		font-size: 18px;
		line-height: 1.7;
		color: #454545;
		margin-bottom: 32px;
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
	}
}

.order-form-section {
	margin-top: 40px;
	background: linear-gradient(135deg, #f8f9fa 0%, #e7e9eb 100%);
	border-radius: 20px;
}
</style>
