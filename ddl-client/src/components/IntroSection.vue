<template>
	<section class="layout-wrapper">
		<div class="block left">
			<NuxtImg
				src="/images/cleaning.png"
				alt="Фон 1"
				preload
				itemprop="contentUrl"
			/>

			<div class="content">
				<div class="content-inner">
					<h1 class="title">Профессиональный клининг помещений</h1>

					<div class="cities-wrapper">
						<UIDIcon name="pin" />

						<ul class="cities">
							<li
								v-for="item in LOCATIONS.cleaning"
								:key="item.value"
							>
								{{ item.name }}
							</li>
						</ul>
					</div>

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
				</div>
			</div>
		</div>

		<div class="block right">
			<NuxtImg
				src="/images/drains-clean.webp"
				alt="Фон 2"
				preload
				itemprop="contentUrl"
			/>

			<div class="content">
				<div class="content-inner">
					<h2 class="title">
						<span>Чистка</span>
						<br />
						<span>Устранение засоров</span>
						<br />
						<span>Прочистка канализации</span>
					</h2>

					<UIDLink
						:to="CONTACTS.phone_drains.link"
						target="_blank"
						class="phone-wrapper"
						@click="ymTriggers.hitPhoneClick()"
					>
						{{ CONTACTS.phone_drains.label }}
					</UIDLink>

					<div class="cities-wrapper">
						<UIDIcon name="pin" />

						<ul class="cities">
							<li
								v-for="item in LOCATIONS.drains"
								:key="item.value"
							>
								{{ item.name }}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { LOCATIONS, CONTACTS } from '@/common/constants';
import useYmTriggers from '@/composables/useYmTriggers';

const ymTriggers = useYmTriggers();
</script>

<style lang="scss" scoped>
section {
	display: grid;
	row-gap: 12px;
	grid-template-columns: 1fr;
	grid-template-rows: 384px 384px;
}

.block {
	border-radius: 20px;
	position: relative;
	z-index: 1;

	.title {
		font-weight: 600;
		font-size: 18px;
		line-height: 22px;
	}

	img {
		position: absolute;
		z-index: -1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: inherit;
		object-position: top;
	}

	.content {
		width: 100%;
		height: 100%;
		border-radius: inherit;
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 40px;
	}

	.content-inner {
		color: #ffffff;
		background-color: #1d1d1ddb;
		padding: 16px;
		height: auto;
		border-top-right-radius: 20px;
		width: 80%;
		backdrop-filter: blur(50px);
		border-bottom-left-radius: 20px;
	}

	.cities-wrapper {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 20px;

		span.icon {
			min-width: 20px;
		}
	}

	.cities {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
		font-size: 16px;
		font-weight: 400;
		color: #b9b9b9;
	}
}

.left {
	border-radius: 20px;
	position: relative;
	z-index: 1;

	.btns {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
		margin-top: 24px;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 40px;
			border-radius: 32px;
			font-size: 16px;
			font-weight: 600;
			line-height: 24px;
			padding-inline: 20px;
			width: 100%;
			color: #ffffff;
		}

		.btn1 {
			background-color: #4b6efd;
			border: 1px solid #4b6efd;
		}

		.btn2 {
			background-color: transparent;
			border: 1px solid #ffffff;
		}
	}
}

.right {
	img {
		transform: scaleX(-1);
	}

	.content {
		justify-content: flex-start;
		align-items: flex-end;
	}

	.content-inner {
		background-color: rgb(255 255 255 / 70%);
		color: #000000;
	}

	.cities {
		color: #000000;
	}

	.phone-wrapper {
		margin-top: 20px;
		color: #638fff;
		font-weight: 600;
		font-size: 22px;
	}
}

@include screen768 {
	section {
		column-gap: 25px;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 384px;
	}

	.block {
		border-radius: 24px;

		.content-inner {
			padding: 30px;
		}
	}

	.left {
		.btns {
			gap: 14px;
		}
	}
}

@include screen1024 {
	section {
		column-gap: 35px;
		grid-template-rows: 534px;
	}

	.block {
		.title {
			font-size: 32px;
			line-height: 120%;
		}

		.content-inner {
			padding: 30px;
		}
	}

	.left {
		.btns {
			margin-top: 44px;

			button {
				font-size: 18px;
				width: auto;
			}
		}
	}

	.right {
		.content-inner {
			padding-top: 50px;
		}
	}
}

@include screen1240 {
	.left {
		.btns {
			button {
				height: 48px;
			}
		}
	}
}

@include screen1440 {
	section {
		grid-template-rows: 734px;
	}

	.block {
		.title {
			font-size: 48px;
		}
	}

	.left {
		.btns {
			flex-wrap: nowrap;
			margin-top: 64px;

			button {
				font-size: 20px;
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
