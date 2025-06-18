<template>
	<section id="contract" class="layout-wrapper">
		<div class="content">
			<p class="title">Долгосрочные договора</p>

			<p class="description">
				Сосредоточьтесь на важных делах, не беспокоясь о чистоте.
				Доверьте уборку профессионалам и наслаждайтесь комфортом!
			</p>

			<UIDLink to="#order" class="btn-order">
				<button>Оставить заявку</button>
			</UIDLink>

			<ul>
				<li v-for="item in list" :key="item">
					{{ item }}
				</li>
			</ul>

			<picture>
				<source
					srcset="/images/contract.png"
					media="(max-width: 1240px)"
				/>
				<source
					srcset="/images/contract-xl.png"
					media="(min-width: 1240px)"
				/>
				<img
					src="/images/contract.png"
					class="img"
					alt="Абстрактное изображение"
				/>
			</picture>
		</div>
	</section>
</template>

<script setup lang="ts">
const list = [
	'Снижение затрат',
	'Упрощение управления',
	'Индивидуальных подход',
	'Постоянство услуг'
];
</script>

<style lang="scss" scoped>
section {
	margin-top: 60px;
	border-radius: 20px;
	padding-top: 32px;
	color: #f0f3f5;
	background-color: #1a1a1a;
	padding-bottom: 251px;
	position: relative;
}

.title {
	font-weight: 600;
	font-size: 26px;
	line-height: 32px;
}

.description {
	font-weight: 400;
	font-size: 14px;
	line-height: 24px;
	margin-top: 8px;
	color: #bfbfbf;
}

.btn-order {
	width: 100%;
	height: 48px;
	border-radius: 32px;
	color: #ffffff;
	background-color: #638fff;
	margin-top: 10px;
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	max-width: 100%;
	align-items: center;
	display: flex;
	justify-content: center;
}

ul {
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-top: 36px;

	li {
		height: 39px;
		border: 1px solid #808080;
		border-radius: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #d8d8d8;
		font-weight: 400;
		font-size: 16px;
		line-height: 120%;
	}
}

.img {
	position: absolute;
	bottom: -53px;
	left: 50%;
	transform: translateX(-50%);
}

@include screen768 {
	section {
		padding-bottom: 51px;
	}

	.btn-order {
		width: fit-content;
		padding-inline: 32px;
		margin-top: 30px;
	}

	ul {
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 40px;
		max-width: 550px;

		li {
			padding-inline: 12px;
		}
	}

	.img {
		position: absolute;
		bottom: -53px;
		left: auto;
		right: 0;
		transform: none;
	}
}

@include screen1024 {
	ul {
		max-width: 650px;
	}
}

@include screen1240 {
	section {
		background-color: #ffffff;
		padding-right: var(--layout-pad-x);
	}

	.content {
		background-color: #1a1a1a;
		border-radius: 20px;
		padding: 28px 50px;
		padding-bottom: 50px;
		position: relative;
	}

	.title {
		@include useFont(dxlm);
	}

	.description {
		@include useFont(txlr);
		margin-top: 48px;
		max-width: 647px;
	}

	ul {
		max-width: 700px;
	}

	.btn-order {
		height: 64px;
		@include useFont(tlgsb);
	}
}

@include screen1440 {
	.img {
		min-height: 500px;
	}

	ul {
		max-width: 100%;
	}
}
</style>
