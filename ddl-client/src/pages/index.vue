<template>
	<div>
		<LazyIntroSection />
		<LazyCalculatorSection />
		<LazyServicesSection />
		<LazyStepsSection />
		<LazyContractSection />
		<LazyExamplesSection />
		<LazyReviewsSection />
		<LazyFaqSection />
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
</script>

<style lang="scss" scoped></style>
