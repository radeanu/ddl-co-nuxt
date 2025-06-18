<template>
	<section class="layout-wrapper">
		<div class="left">
			<h1>Профессиональный клининг помещений</h1>
			<p>
				Предлагаем профессиональные услуги по уборке жилых и
				коммерческих помещений.
			</p>

			<div class="btns">
				<UIDLink to="/#calculator">
					<button type="button" class="btn1">
						Рассчитать стоимость
					</button>
				</UIDLink>

				<UIDLink to="/#contract">
					<button type="button" class="btn2">
						Хочу сотрудничать
					</button>
				</UIDLink>
			</div>

			<NuxtImg
				src="/images/vector.png"
				fit="contain"
				loading="lazy"
				decoding="async"
			/>
		</div>

		<div class="right">
			<NuxtImg class="img" src="/images/cleaning.png" alt="Фон" preload />
		</div>
	</section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
section {
	display: grid;
	row-gap: 12px;
	grid-template-columns: 1fr;
	grid-template-rows: auto auto;
}

.left {
	background-color: #cfd2dd;
	border-radius: 20px;
	color: #666666;
	padding: 16px;
	position: relative;
	z-index: 1;

	h1 {
		color: #1d1d1d;
		font-weight: 600;
		font-size: 28px;
		line-height: 40px;
	}

	p {
		margin-top: 20px;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
	}

	img {
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: -1;
	}

	.btns {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
		margin-top: 41px;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 48px;
			border-radius: 48px;
			font-size: 16px;
			font-weight: 600;
			line-height: 24px;
			padding-inline: 20px;
			width: 100%;
		}

		.btn1 {
			color: #ffffff;
			background-color: #4b6efd;
			border: 1px solid #4b6efd;
		}

		.btn2 {
			color: #1d1d1d;
			background-color: transparent;
			border: 1px solid #1d1d1d;
		}
	}
}

.right {
	border-radius: 20px;

	.img {
		width: 100%;
		height: 328px;
		object-fit: cover;
		border-radius: inherit;
		object-position: top;
	}
}

@include screen768 {
	section {
		column-gap: 25px;
		grid-template-rows: 384px;
		grid-template-columns: 57.3% 1fr;
	}

	.left {
		border-radius: 24px;
		padding: 0 20px;

		h1 {
			margin-top: 41px;
		}

		p {
			margin-top: 20px;
		}

		.btns {
			gap: 14px;
		}
	}

	.right {
		border-radius: 24px;

		.img {
			height: 100%;
		}
	}
}

@include screen1024 {
	section {
		column-gap: 35px;
		grid-template-rows: 534px;
	}

	.left {
		h1 {
			font-size: 52px;
			line-height: 120%;
		}

		p {
			font-size: 22px;
		}

		.btns {
			margin-top: 44px;
			flex-wrap: nowrap;

			button {
				font-size: 20px;
				width: auto;
			}
		}
	}

	.right {
		border-radius: 20px;

		.img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: inherit;
		}
	}
}

@include screen1440 {
	section {
		grid-template-rows: 734px;
	}

	.left {
		padding-inline: 50px;

		h1 {
			margin-top: 141px;
			font-size: 72px;
		}

		p {
			font-size: 24px;
		}

		.btns {
			margin-top: 64px;

			button {
				height: 58px;
				border-radius: 32px;
			}

			.btn1 {
				padding-inline: 32px;
			}

			.btn2 {
				padding-inline: 20px;
			}
		}
	}
}
</style>
