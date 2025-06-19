<template>
	<div class="wrapper" @click.self="$emit('close')">
		<Transition name="slide-bottom" appear>
			<div class="content">
				<div class="header">
					<UIDIcon name="logo" class="logo" />
					<button
						type="button"
						class="close-btn"
						@click="$emit('close')"
					>
						<UIDIcon name="x-close" />
					</button>
				</div>

				<nav>
					<ul>
						<li
							v-for="item in MENUS"
							:key="item.label"
							@click="$emit('close')"
						>
							<UIDLink :to="item.link">{{ item.label }}</UIDLink>
						</li>
					</ul>
				</nav>

				<div class="meta">
					<LocationSelect />

					<div class="time">
						<UIDLink
							:to="CONTACTS.phone.link"
							target="_blank"
							class="phone"
							@click="ymTriggers.hitPhoneClick()"
						>
							{{ CONTACTS.phone.label }}
						</UIDLink>
						<span>ПН -ВС: круглосуточно</span>
					</div>
				</div>

				<UIDLink to="#order" class="btn-order">
					<button type="button" @click="$emit('close')">
						Оставить заявку
					</button>
				</UIDLink>

				<UIDLink
					:to="CONTACTS.tg.link"
					class="tg-link"
					target="_blank"
					@click="ymTriggers.hitGoToTG()"
				>
					<UIDIcon name="tg" />
					<span>Написать</span>
				</UIDLink>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { MENUS, CONTACTS } from '@/common/constants';
import useYmTriggers from '@/composables/useYmTriggers';

const $emit = defineEmits<{
	(e: 'close'): void;
	(e: 'order'): void;
}>();

const ymTriggers = useYmTriggers();
</script>

<style lang="scss" scoped>
.wrapper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	width: 100dvw;
	height: 100vh;
	height: 100dvh;
	background-color: rgba($color: #000000, $alpha: 0.5);
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
}

.content {
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	background-color: #ffffff;
	padding: 18px 12px;
}

.header {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: space-between;
	gap: 10px;

	.logo {
		width: 94px;
		height: 32px;
	}

	.close-btn {
		@include useFixedSize(44px, 44px);
		background-color: #d9d9d9;
		border-radius: 32px;
		color: #4c4c4c;

		--icon-width: 20px;
		--icon-height: 20px;
	}
}

nav {
	padding-block: 20px;
	font-size: 16px;
	color: #959595;
	margin-top: 20px;
	border-block: 1px solid #b5c2cc;
	font-weight: 500;
	font-size: 18px;
	line-height: 24px;

	ul {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
}

.meta {
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	gap: 30px;
	margin-top: 20px;
	padding-bottom: 20px;
	border-bottom: 1px solid #b5c2cc;
}

.time {
	display: flex;
	flex-direction: column;
	color: #808080;
	font-weight: 400;
	font-size: 12px;
	line-height: 18px;

	.phone {
		font-weight: 600;
		font-size: 20px;
		line-height: 28px;
		color: #638fff;
	}
}

.btn-order {
	height: 44px;
	border-radius: 32px;
	background-color: #333333;
	color: #ffffff;
	width: 100%;
	margin-top: 12px;
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	max-width: 100%;
	align-items: center;
	display: flex;
	justify-content: center;
}

.tg-link {
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 100%;
	height: 44px;
	border-radius: 32px;
	background-color: #638fff;
	color: #ffffff;
	width: 100%;
	margin-top: 12px;
	gap: 8px;
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;

	--icon-width: 20px;
	--icon-height: 20px;
}
</style>
