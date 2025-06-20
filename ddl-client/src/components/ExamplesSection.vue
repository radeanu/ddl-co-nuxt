<template>
	<section id="example" class="layout-wrapper">
		<h2 class="title">
			<span>Примеры</span>
			<span class="color"> наших работ</span>
		</h2>

		<div class="examples">
			<picture
				v-for="(ex, idx) in examples"
				:key="idx"
				:class="ex.className"
				ref="itemsRef"
			>
				<span class="ex-title">{{ ex.title }}</span>
				<source :srcset="ex.small" media="(max-width: 768px)" />
				<source :srcset="ex.base" media="(min-width: 768px)" />
				<img
					:src="ex.small"
					class="img"
					:alt="ex.alt"
					loading="lazy"
					decoding="async"
					width="441"
					height="480"
				/>
			</picture>
		</div>

		<button type="button" class="btn-scroll" @click="handleScrollNext">
			<UIDIcon name="arrow-right" />
		</button>
	</section>
</template>

<script setup lang="ts">
const examples = [1, 1, 2, 2, 3, 3, 4, 4].map((ex, idx) => {
	const before = idx % 2 === 0;
	const img = before ? 'before' : 'after';
	const className = before ? 'before' : 'after';
	const title = before ? 'До' : 'После';

	return {
		title,
		className,
		alt: `${title} - пример ${ex}`,
		base: `/images/ex${ex}-${img}.png`,
		small: `/images/ex${ex}-${img}-sm.png`
	};
});

const itemsRef = useTemplateRef('itemsRef');
const observer = useIntersectionObserver();

onMounted(() => {
	if (!itemsRef.value) return;

	itemsRef.value.map((item, idx) => {
		const before = idx % 2 === 0;
		item.dataset.pos = before ? 'before' : 'after';

		observer.createObserver(
			item,
			{
				isHidden: {
					handler() {
						console.log('HIDDEN');
						item.dataset.visible = '0';
					}
				},
				isIntersecting: {
					handler() {
						console.log('VISIBLE');
						item.dataset.visible = '1';
					}
				}
			},
			{ threshold: 0.1 }
		);
	});
});

function handleScrollNext() {
	if (!itemsRef.value) return;

	const idx = itemsRef.value.findLastIndex((item) => {
		if (item.dataset.pos === 'before') return false;

		return item.dataset.visible === '1';
	});

	if (idx === -1) return;

	const nextIndex = idx + 1 === itemsRef.value.length ? 0 : idx + 1;
	const nextItem = itemsRef.value[nextIndex];

	nextItem.scrollIntoView({
		block: 'start',
		inline: 'start',
		behavior: 'smooth'
	});
}
</script>

<style lang="scss" scoped>
section {
	margin-top: 60px;
	position: relative;

	--img-width: calc(50vw - var(--layout-pad-x) - 3px);
	--img-height: 180px;
}

.title {
	font-weight: 600;
	font-size: 26px;
	line-height: 32px;
	max-width: 170px;

	.color {
		color: #86a8ff;
	}
}

.examples {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	gap: 6px;
	margin-top: 24px;
	overflow: hidden;

	.ex-title {
		position: absolute;
		background-color: #f0f3f5;
		top: 8px;
		left: 8px;
		width: 65px;
		height: 32px;
		border: 1px solid #808080;
		border-radius: 100px;
		color: #4c4c4c;
		font-weight: 500;
		font-size: 14px;
		line-height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

picture {
	position: relative;
	display: block;

	&:nth-of-type(odd) {
		margin-left: 24px;
	}

	&:nth-of-type(1) {
		margin-left: 0;
	}

	img {
		@include useFixedSize(var(--img-width), var(--img-height));
		object-fit: cover;
	}

	&.before img {
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
	}

	&.after img {
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
	}
}

.btn-scroll {
	border-radius: 32px;
	background-color: #d9d9d9;
	color: #4c4c4c;
	@include useFixedSize(44px, 44px);
	position: absolute;
	top: 0;
	right: var(--layout-pad-x);
}

@include screen520 {
	section {
		--img-height: 250px;
	}
}

@include screen768 {
	section {
		--img-height: 350px;
	}
}

@include screen1024 {
	section {
		--img-width: calc(25vw - var(--layout-pad-x) - 5px);
	}

	.btn-scroll {
		right: 35px;
		top: 390px;
	}
}

@include screen1440 {
	section {
		--img-height: 480px;
	}

	.btn-scroll {
		@include useFixedSize(64px, 64px);
	}

	.title {
		font-weight: 500;
		font-size: 64px;
		line-height: 76px;
		max-width: 413px;
	}

	.examples {
		margin-top: 36px;

		.ex-title {
			width: 77px;
			height: 44px;
			font-weight: 500;
			font-size: 18px;
			line-height: 24px;
			top: 20px;
			left: 20px;
		}
	}
}

@include screen1900 {
	section {
		--img-width: calc(25vw - var(--layout-pad-x) + 19px);
	}
}
</style>
