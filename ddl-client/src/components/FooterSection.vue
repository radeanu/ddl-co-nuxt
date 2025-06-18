<template>
	<footer id="contacts" class="layout-wrapper">
		<div class="content">
			<UIDIcon name="logo" />

			<div class="links">
				<UIDLink
					:to="CONTACTS.phone.link"
					class="link-phone"
					target="_blank"
					@click="ymTriggers.hitPhoneClick()"
				>
					<span>Телефон:</span>
					<span class="label">{{ CONTACTS.phone.label }}</span>

					<NuxtImg
						src="/images/phone-call.png"
						class="img"
						width="111"
						height="111"
						loading="lazy"
						decoding="async"
						alt="Телефон"
					/>
				</UIDLink>

				<UIDLink
					:to="CONTACTS.tg.link"
					class="link-tg"
					target="_blank"
					@click="ymTriggers.hitGoToTG()"
				>
					<span>Мы в Telegram</span>
					<span class="label">Перейти</span>

					<NuxtImg
						src="/images/tg-qr.png"
						class="img"
						alt="Телеграм"
						width="69"
						height="69"
						loading="lazy"
						decoding="async"
					/>
				</UIDLink>
			</div>

			<div class="sub">
				<UIDLink to="/">Политика конфиденциальности</UIDLink>
				<address>
					432027, г. Ярославль, пр-кт. Ленина 15 , д. 27а
				</address>
				<!-- <p>© ООО «DDL», 2025</p> -->
			</div>

			<NuxtImg
				src="/images/vector.png"
				fit="contain"
				loading="lazy"
				decoding="async"
				alt="Фон"
				class="bg-img d-block-lte-768"
			/>
		</div>
	</footer>
</template>

<script setup lang="ts">
import { CONTACTS } from '@/common/constants';
import useYmTriggers from '@/composables/useYmTriggers';

const ymTriggers = useYmTriggers();
</script>

<style lang="scss" scoped>
footer {
	background-color: #1f2022;
	border-top-left-radius: 24px;
	border-top-right-radius: 24px;
	padding-block: 16px;
	position: relative;
	z-index: 0;
	overflow: hidden;
	margin-top: 60px;
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.icon {
	--icon-width: 94px;
	--icon-height: 32px;
}

.links {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-top: 64px;
}

.link-phone {
	width: 100%;
	max-width: unset;
	height: 108px;
	background-color: #4b6efd;
	display: flex;
	flex-direction: column;
	gap: 12px;
	color: #bac8ff;
	font-weight: 400;
	font-size: 18px;
	line-height: 100%;
	padding: 16px;
	border-radius: 20px;
	justify-content: space-between;
	position: relative;

	.label {
		color: #f9f9f9;
		font-weight: 500;
		font-size: 35px;
		line-height: 100%;
	}

	.img {
		position: absolute;
		width: 111px;
		height: 111px;
		right: 0;
		bottom: 0;
	}
}

.link-tg {
	max-width: unset;
	width: 100%;
	height: 115px;
	background-color: #3a3a3a;
	display: flex;
	flex-direction: column;
	gap: 24px;
	color: #898989;
	font-weight: 400;
	font-size: 18px;
	line-height: 100%;
	padding: 16px;
	border-radius: 20px;
	justify-content: center;
	position: relative;

	.label {
		color: #4b6efd;
	}

	.img {
		position: absolute;
		width: 69px;
		height: 69px;
		right: 16px;
		bottom: 23px;
	}
}

.sub {
	@include useFont(txsm);
	color: #959595;
	margin-top: 64px;
	display: flex;
	flex-direction: column;
	gap: 12px;
	align-items: center;
}

.bg-img {
	position: absolute;
	left: 0;
	width: 100%;
	object-fit: cover;
	z-index: -1;
}

@include screen768 {
	.links {
		flex-direction: row;
	}
}

@include screen1024 {
	.content {
		padding: 50px;
		align-items: flex-start;
		padding-bottom: 0px;
	}

	.sub {
		width: 100%;
		flex-direction: row;
		gap: 50px;
		justify-content: space-between;
		margin-top: 44px;
	}
}

@include screen1240 {
	footer {
		background-color: #ffffff;
		margin-top: 118px;
	}

	.icon {
		--icon-width: 144px;
		--icon-height: 49px;
	}

	.content {
		background-color: #1a1a1a;
		border-radius: 20px;
		padding: 50px;
		position: relative;
		z-index: 0;
		overflow: hidden;
		margin-top: 60px;
	}

	.links {
		position: absolute;
		margin-top: 0;
		top: 50px;
		right: 155px;
		width: auto;
	}

	.link-phone,
	.link-tg {
		width: 336px;
		height: 116px;
	}

	.sub {
		margin-top: 24px;
		color: #545454;
		flex-direction: column;
		gap: 20px;
		align-items: flex-start;
	}
}
</style>
