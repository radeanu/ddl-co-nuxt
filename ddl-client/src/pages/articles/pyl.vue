<template>
	<div class="article-page">
		<article class="article-container layout-wrapper">
			<div class="article-hero">
				<div class="article-hero-content">
					<h1 class="article-title">
						Почему пыль возвращается так быстро и как с ней бороться
					</h1>
					<p class="article-intro">
						Многие из нас сталкиваются с проблемой: только что
						убрали дом, а через пару дней пыль снова покрывает
						поверхности. Это не случайность — пыль генерируется
						постоянно и проникает в жилище различными способами.
					</p>
				</div>
				<div class="article-hero-image">
					<img
						src="/images/articles/dust.png"
						alt="Уборка пыли"
						loading="lazy"
					/>
				</div>
			</div>

			<div class="article-layout">
				<div class="article-content">
					<section class="article-section">
						<h2 class="section-title">
							Причины быстрого возвращения пыли
						</h2>

						<p class="intro-text">
							Пыль — это смесь мельчайших частиц: отмерших клеток
							кожи, волос, волокон ткани, загрязнителей из воздуха
							и даже пылевых клещей. Вот почему она появляется так
							быстро:
						</p>

						<div class="reason-card">
							<div class="reason-icon">👤</div>
							<div class="reason-content">
								<h3>Постоянная генерация внутри дома</h3>
								<p>
									Средний человек теряет около 40 000 клеток
									кожи в день, а если в доме есть питомцы,
									добавляются шерсть и перхоть. Эти частицы
									оседают на поверхностях и циркулируют с
									воздухом.
								</p>
							</div>
						</div>

						<div class="reason-card">
							<div class="reason-icon">🌬️</div>
							<div class="reason-content">
								<h3>Внешние источники</h3>
								<p>
									Пыль проникает через открытые окна, двери,
									вентиляционные системы и даже на обуви. Если
									фильтры в системе кондиционирования или
									отопления грязные, они не удерживают
									частицы, и пыль разносится по всему дому.
								</p>
							</div>
						</div>

						<div class="reason-card">
							<div class="reason-icon">🧹</div>
							<div class="reason-content">
								<h3>Ошибки в уборке</h3>
								<p>
									Использование сухих тряпок или перьевых
									метелок просто поднимает пыль в воздух, и
									она оседает заново. Кроме того, движение
									людей и сквозняки способствуют ее
									распространению.
								</p>
							</div>
						</div>

						<div class="reason-card">
							<div class="reason-icon">💧</div>
							<div class="reason-content">
								<h3>Влажность и клещи</h3>
								<p>
									В влажных условиях размножаются пылевые
									клещи, которые добавляют аллергены в пыль.
								</p>
							</div>
						</div>
					</section>

					<section class="article-section methods-section">
						<h2 class="section-title">
							Эффективные способы борьбы с пылью
						</h2>

						<p class="intro-text">
							Хотя полностью избавиться от пыли нельзя, вы можете
							значительно снизить ее количество. Вот проверенные
							стратегии:
						</p>

						<div class="methods-grid">
							<div class="method-card">
								<div class="method-number">1</div>
								<h3>Регулярная и правильная уборка</h3>
								<p>
									Протирайте поверхности влажной микрофибровой
									тканью сверху вниз, чтобы пыль не
									разлеталась.
								</p>
							</div>

							<div class="method-card">
								<div class="method-number">2</div>
								<h3>Контроль источников</h3>
								<p>
									Снимайте обувь у входа, держите окна
									закрытыми в пыльные дни и регулярно меняйте
									фильтры в вентиляционной системе. Установите
									очиститель воздуха — он удаляет до 99,9%
									пыли.
								</p>
							</div>

							<div class="method-card">
								<div class="method-number">3</div>
								<h3>Минимизация накопления</h3>
								<p>
									Разберите хлам — меньше поверхностей, меньше
									пыли. Выносите ковры и подушки на улицу для
									выбивания. Для питомцев: регулярно их
									вычесывайте на улице.
								</p>
							</div>

							<div class="method-card highlight">
								<div class="method-number">4</div>
								<h3>Профессиональная помощь</h3>
								<p>
									Если пыль упорно возвращается, обратитесь к
									специалистам. В нашей клининговой компании
									мы проводим глубокую чистку мебели и
									труднодоступных мест, что помогает
									поддерживать чистоту дольше.
								</p>
							</div>
						</div>
					</section>

					<section class="article-conclusion">
						<h2>Заключение</h2>
						<p>
							Пыль — неизбежный спутник жизни, но с системным
							подходом вы можете сделать свой дом свежее и
							здоровее. Начните с простых привычек, а для
							идеального результата доверьте уборку
							профессионалам.
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
	title: 'Почему пыль возвращается так быстро и как с ней бороться',
	description:
		'Разбираем причины быстрого появления пыли и делимся эффективными способами борьбы с ней. Практические советы от профессионалов клининга.',
	ogTitle: 'Почему пыль возвращается так быстро и как с ней бороться',
	ogDescription:
		'Разбираем причины быстрого появления пыли и делимся эффективными способами борьбы с ней.',
	ogImage: baseUrl + '/images/articles/dust.png',
	ogUrl: baseUrl + '/articles/pyl',
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
	background: linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%);
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
	border-bottom: 3px solid #ff9a56;

	@include screen768 {
		font-size: 36px;
	}
}

.intro-text {
	font-size: 18px;
	line-height: 1.7;
	color: #454545;
	margin-bottom: 32px;
}

.reason-card {
	display: flex;
	gap: 24px;
	margin-bottom: 28px;
	padding: 28px;
	background: linear-gradient(135deg, #fff9f5 0%, #ffffff 100%);
	border-radius: 16px;
	border-left: 4px solid #ff9a56;
	transition: transform 0.3s ease, box-shadow 0.3s ease;

	&:hover {
		transform: translateX(8px);
		box-shadow: 0 8px 24px rgba(255, 154, 86, 0.15);
	}

	.reason-icon {
		flex-shrink: 0;
		font-size: 48px;
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.reason-content {
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

.methods-section {
	background: linear-gradient(135deg, #f0f7ff 0%, #e6f2ff 100%);
	padding: 40px;
	border-radius: 20px;
	margin-bottom: 60px;
}

.methods-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 24px;

	@include screen768 {
		grid-template-columns: repeat(2, 1fr);
	}
}

.method-card {
	background: white;
	padding: 32px;
	border-radius: 16px;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	position: relative;
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background: linear-gradient(90deg, #ff9a56 0%, #ff6b6b 100%);
	}

	&:hover {
		transform: translateY(-8px);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
	}

	&.highlight {
		background: linear-gradient(135deg, #fff9f5 0%, #ffffff 100%);
		border: 2px solid #ff9a56;
	}

	.method-number {
		width: 40px;
		height: 40px;
		background: linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		font-weight: 700;
		margin-bottom: 16px;
	}

	h3 {
		font-size: 20px;
		font-weight: 600;
		color: #1d1d1d;
		margin-bottom: 12px;
		line-height: normal;
	}

	p {
		font-size: 16px;
		line-height: 1.6;
		color: #454545;
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
