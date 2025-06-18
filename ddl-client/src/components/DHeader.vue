<template>
	<header class="layout-wrapper">
		<UIDIcon name="logo" class="logo" />

		<nav class="d-block-gte-1024">
			<ul>
				<li v-for="item in menus" :key="item.label">
					<UIDLink :to="item.link">{{ item.label }}</UIDLink>
				</li>
			</ul>
		</nav>

		<div class="right-side">
			<button type="button" class="location-toggle d-flex-gte-520">
				<UIDIcon name="pin" />
				<span>Москва</span>
			</button>

			<div class="time">
				<span>ПН -ВС: круглосуточно</span>
				<UIDLink
					:to="CONTACTS.phone.link"
					target="_blank"
					class="phone"
					@click="ymTriggers.hitPhoneClick()"
				>
					{{ CONTACTS.phone.label }}
				</UIDLink>
			</div>

			<UIDLink
				:to="CONTACTS.tg.link"
				class="tg-link d-flex-gte-1024"
				target="_blank"
				@click="ymTriggers.hitGoToTG()"
			>
				<UIDIcon name="tg" />
			</UIDLink>

			<button type="button" class="btn-order d-flex-gte-1024">
				Оставить заявку
			</button>

			<button
				class="btn-burger d-flex-lt-1024"
				:class="{ opened: openMbMenu }"
				@click="handleToggleMobileMenu"
			>
				<div class="d1" />
				<div class="d2" />
				<div class="d3" />
			</button>
		</div>

		<MobileMenu v-if="openMbMenu" @close="handleToggleMobileMenu" />
	</header>
</template>

<script setup lang="ts">
import useYmTriggers from '@/composables/useYmTriggers';
import { MENUS, CONTACTS } from '@/common/constants';

const ymTriggers = useYmTriggers();
const { togglePageOverflow } = useTogglePageOverflow();

const openMbMenu = ref(false);

const menus = MENUS.filter((m) => m.header);

function handleToggleMobileMenu() {
	openMbMenu.value = !openMbMenu.value;
	togglePageOverflow(!openMbMenu.value);
}
</script>

<style lang="scss" scoped>
header {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	height: 72px;
	gap: 16px;
	justify-content: space-between;
	position: sticky;
	top: 0;
	z-index: var(--z-index-header);
	background-color: #ffffff;
}

.logo {
	--icon-width: 80px;
	--icon-height: 32px;
}

.right-side {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	gap: 16px;

	.time {
		display: flex;
		flex-direction: column;
		gap: 7px;
		color: #868686;
		font-size: 12px;
		line-height: 120%;
		letter-spacing: 0%;

		.phone {
			font-weight: 600;
			font-size: 18px;
			color: #638fff;
		}
	}

	.tg-link {
		@include useFixedSize(56px, 56px);
		border-radius: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #638fff;
		color: #ffffff;
	}

	.btn-order {
		color: #ffffff;
		background-color: #1d1d1d;
		border-radius: 32px;
		width: 212px;
		height: 56px;
	}

	.btn-burger {
		@include useFixedSize(44px, 44px);
		background-color: #638fff;
		border-radius: 32px;
		padding: 0;
		display: flex;
		position: relative;
		align-items: start;
		justify-content: start;

		.d1,
		.d2,
		.d3 {
			width: 18px;
			height: 2px;
			border-radius: 1.8px;
			background-color: #ffffff;
			position: absolute;
			right: 13px;
			left: auto;
			transition: all 0.2s;
			opacity: 1;
			top: 0;
		}

		.d1 {
			margin-top: 14px;
		}

		.d2 {
			margin-top: 20px;
		}

		.d3 {
			width: 13px;
			margin-top: 26px;
		}

		&.opened {
			.d1 {
				margin-top: 20px;
				transform: rotate(-45deg);
			}

			.d2 {
				transform: rotate(45deg);
			}

			.d3 {
				opacity: 0;
			}
		}
	}
}

.location-toggle {
	border-radius: 32px;
	background-color: #ffffff;
	color: #1a1a1a;
	border: 1px solid #808080;
	gap: 8px;
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	padding: 0 16px;
	height: 44px;

	.icon {
		color: #bfbfbf;
	}
}

nav {
	margin-left: auto;
	margin-right: 100px;
	font-size: 16px;

	ul {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		gap: 16px;
		align-items: center;

		li {
			color: #454545;
		}
	}
}

@include screen1024 {
	nav {
		margin-right: 30px;
	}
}

@include screen1440 {
	header {
		height: 104px;
	}

	.logo {
		--icon-width: 144px;
		--icon-height: 49px;
	}

	nav {
		font-size: 18px;

		ul {
			gap: 20px;
		}
	}

	.right-side {
		.time {
			font-weight: 400;
			font-size: 18px;

			.phone {
				font-weight: 600;
				font-size: 22px;
			}
		}
	}
}

@include screen1900 {
	nav {
		margin-right: 261px;

		ul {
			gap: 40px;
		}
	}
}
</style>
