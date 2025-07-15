<template>
	<div>
		<UIDLink
			title="Главная"
			aria-label="Главная"
			to="/"
			class="layout-wrapper link"
		>
			<UIDIcon name="arrow-left" />
			<span>Вернуться на главную</span>
		</UIDLink>

		<LazyStepsSection page />
		<LazyFooterSection />
	</div>
</template>

<script setup lang="ts">
import { SEO } from '@/common/constants';

const baseUrl = useRuntimeConfig().public.NUXT_PUBLIC_SITE_URL as string;

useSeoMeta({
	title: SEO.title,
	description: SEO.description,
	ogTitle: SEO.title,
	ogDescription: SEO.description,
	ogImage: baseUrl + '/images/cleaning.png',
	ogUrl: baseUrl,
	ogType: 'website',
	ogSiteName: 'DDL - клининговая компания',
	ogLocale: 'ru_RU',
	twitterCard: 'summary_large_image',
	twitterTitle: SEO.title,
	twitterDescription: SEO.description
});

useHead({ htmlAttrs: { lang: 'ru' } });
</script>

<style lang="scss" scoped>
.link {
	display: flex;
	gap: 16px;
	flex-wrap: nowrap;
	align-items: center;
	margin-block: 10px 20px;
	margin-left: 0;
}
</style>
