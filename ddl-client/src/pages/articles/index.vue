<template>
	<div class="articles-page">
		<div class="articles-container layout-wrapper">
			<div class="articles-grid">
				<article
					class="article-card"
					v-for="article in articles"
					:key="article.slug"
				>
					<div class="article-image">
						<img
							:src="article.image"
							:alt="article.title"
							loading="lazy"
						/>
					</div>
					<div class="article-content">
						<RouterLink :to="article.link">
							<h2 class="article-title">{{ article.title }}</h2>
						</RouterLink>
						<p class="article-excerpt">{{ article.excerpt }}</p>
						<div class="article-meta">
							<span class="article-category">
								{{ article.category }}
							</span>
							<span class="article-read-time">
								{{ article.readTime }} мин чтения
							</span>
						</div>
						<UIDLink :to="article.link" class="article-link">
							Читать статью
							<UIDIcon name="arrow-right" class="arrow-icon" />
						</UIDLink>
					</div>
				</article>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const articles = [
	{
		slug: 'zasor-kanalizacii',
		title: 'Причины засора канализации в квартире: топ-5 ошибок, которые совершают все',
		excerpt:
			'Узнайте о самых распространенных ошибках, которые приводят к засорам канализации, и как их избежать. Профессиональные советы от специалистов.',
		category: 'Сантехника',
		readTime: 5,
		image: '/images/articles/sewer.jpg',
		link: '/articles/zasor-kanalizacii'
	},
	{
		slug: 'pyl',
		title: 'Почему пыль возвращается так быстро и как с ней бороться',
		excerpt:
			'Разбираем причины быстрого появления пыли и делимся эффективными способами борьбы с ней. Практические советы от профессионалов клининга.',
		category: 'Уборка',
		readTime: 4,
		image: '/images/articles/dust.png',
		link: '/articles/pyl'
	},
	{
		slug: 'plesen',
		title: 'Как бороться с плесенью в ванной: профилактика и натуральные средства',
		excerpt:
			'Эффективные способы профилактики плесени и натуральные средства для её удаления. Безопасные методы борьбы с плесенью в ванной комнате.',
		category: 'Гигиена',
		readTime: 6,
		image: '/images/articles/mold.webp',
		link: '/articles/plesen'
	}
];

const baseUrl = useRuntimeConfig().public.NUXT_PUBLIC_SITE_URL as string;

useSeoMeta({
	title: 'Полезные статьи по уборке и клинингу',
	description:
		'Экспертные советы по уборке, борьбе с загрязнениями и поддержанию чистоты в доме. Профессиональные рекомендации от специалистов клининга.',
	ogTitle: 'Полезные статьи по уборке и клинингу',
	ogDescription:
		'Экспертные советы по уборке, борьбе с загрязнениями и поддержанию чистоты в доме.',
	ogImage: baseUrl + '/images/cleaning.png',
	ogUrl: baseUrl + '/articles',
	ogType: 'website'
});

useHead({ htmlAttrs: { lang: 'ru' } });
</script>

<style lang="scss" scoped>
.articles-page {
	background-color: #f8f9fa;
	min-height: 100vh;
}

.articles-container {
	padding-top: 40px;
	padding-bottom: 80px;
}

.articles-hero {
	text-align: center;
	margin-bottom: 60px;
	padding: 60px 40px;
	background: linear-gradient(135deg, #638fff 0%, #4b6efd 100%);
	border-radius: 24px;
	color: white;

	.articles-title {
		font-size: 48px;
		font-weight: 700;
		line-height: 1.2;
		margin-bottom: 24px;

		@include screen768 {
			font-size: 56px;
		}

		@include screen1024 {
			font-size: 64px;
		}
	}

	.articles-subtitle {
		font-size: 20px;
		line-height: 1.6;
		opacity: 0.95;
		max-width: 600px;
		margin: 0 auto;

		@include screen1024 {
			font-size: 24px;
		}
	}
}

.articles-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 40px;

	@include screen768 {
		grid-template-columns: repeat(2, 1fr);
	}

	@include screen1024 {
		grid-template-columns: repeat(3, 1fr);
	}
}

.article-card {
	background: white;
	border-radius: 20px;
	overflow: hidden;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

	&:hover {
		transform: translateY(-8px);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
	}

	.article-image {
		width: 100%;
		height: 240px;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.3s ease;
		}
	}

	&:hover .article-image img {
		transform: scale(1.05);
	}

	.article-content {
		padding: 32px;

		.article-title {
			font-size: 24px;
			font-weight: 700;
			line-height: 1.3;
			color: #1d1d1d;
			margin-bottom: 16px;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.article-excerpt {
			font-size: 16px;
			line-height: 1.6;
			color: #454545;
			margin-bottom: 20px;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.article-meta {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 24px;
			font-size: 14px;

			.article-category {
				background: linear-gradient(135deg, #638fff 0%, #4b6efd 100%);
				color: white;
				padding: 6px 12px;
				border-radius: 16px;
				font-weight: 600;
			}

			.article-read-time {
				color: #868686;
			}
		}

		.article-link {
			display: inline-flex;
			align-items: center;
			gap: 8px;
			color: #638fff;
			font-weight: 600;
			text-decoration: none;
			transition: color 0.3s ease;

			&:hover {
				color: #4b6efd;
			}

			.arrow-icon {
				--icon-width: 16px;
				--icon-height: 16px;
				transition: transform 0.3s ease;
			}

			&:hover .arrow-icon {
				transform: translateX(4px);
			}
		}
	}
}
</style>
