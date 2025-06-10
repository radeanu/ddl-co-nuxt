<template>
	<section class="layout-wrapper">
		<p class="section-title">
			<span>На пути к чистоте всего</span>
			<span class="color"> 4 шага</span>
		</p>

		<ul ref="sliderRef">
			<li v-for="step in STEPS" :key="step.name" ref="itemsRef">
				<p>{{ step.name }}</p>

				<NuxtImg
					:src="step.img"
					loading="lazy"
					decoding="async"
					class="img"
				/>
			</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
import { STEPS } from '@/common/constants';

let interval: NodeJS.Timeout | undefined;
const activeIdx = ref(0);

const itemsRef = useTemplateRef('itemsRef');
const sliderRef = useTemplateRef('sliderRef');

const observer = useIntersectionObserver();

watch(
	activeIdx,
	() => {
		const targetEl = itemsRef.value?.[activeIdx.value];
		if (!targetEl) return;

		targetEl.scrollIntoView({
			block: 'nearest',
			inline: 'nearest',
			behavior: 'smooth'
		});
	},
	{ immediate: true }
);

onMounted(() => {
	if (!sliderRef.value) return;

	observer.createObserver(sliderRef.value, {
		isHidden: {
			handler() {
				clearInterval(interval);
			}
		},
		isIntersecting: {
			handler() {
				runAnimation();
			}
		}
	});
});

function runAnimation() {
	interval = setInterval(() => {
		if (STEPS.length === activeIdx.value + 1) {
			activeIdx.value = 0;
			return;
		}

		activeIdx.value += 1;
	}, 3000);
}
</script>

<style lang="scss" scoped>
section {
	margin-top: 60px;
}

.section-title {
	max-width: 250px;
}

ul {
	display: flex;
	flex-wrap: nowrap;
	gap: 12px;
	align-items: center;
	overflow: hidden;
	margin-top: 24px;

	li {
		@include useFont(tlgm);
		@include useFixedSize(168px, 188px);
		position: relative;
		background-color: #f0f3f5;
		border-radius: 18px;
		color: #202027;
		padding: 16px;

		.img {
			width: 88px;
			height: 88px;
			position: absolute;
			bottom: 16px;
			right: 16px;
		}
	}
}

@include screen1024 {
	.section-title {
		max-width: 420px;
	}
}

@include screen1440 {
	.section-title {
		max-width: 578px;
	}
}
</style>
