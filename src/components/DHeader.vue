<template>
	<header class="layout-wrapper">
		<UIDIcon name="logo" class="logo" />

		<nav class="d-block-gte-1240">
			<ul>
				<li>
					<button type="button" class="location-toggle">
						<UIDIcon name="pin" />
						<span>Москва</span>
					</button>
				</li>
				<li v-for="item in MENUS" :key="item.label">
					<UIDLink :to="item.link">{{ item.label }}</UIDLink>
				</li>
			</ul>
		</nav>

		<div class="right-side">
			<div class="time">
				<span>ПН -ВС: круглосуточно</span>
				<UIDLink
					:to="CONTACTS.phone.link"
					target="_blank"
					class="phone"
				>
					{{ CONTACTS.phone.label }}
				</UIDLink>
			</div>

			<UIDLink
				:to="CONTACTS.tg.link"
				class="tg-link d-flex-gte-768"
				target="_blank"
			>
				<UIDIcon name="tg" />
			</UIDLink>

			<button type="button" class="btn-order d-flex-gte-768">
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
	</header>
</template>

<script setup lang="ts">
import { MENUS, CONTACTS } from '@/common/constants';
const { togglePageOverflow } = useTogglePageOverflow();

const openMbMenu = ref(false);

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
			color: #4b6efd;
		}
	}

	.tg-link {
		@include useFixedSize(56px, 56px);
		border-radius: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #d5ddff;
	}

	.btn-order {
		color: #ffffff;
		background-color: #1d1d1d;
		border-radius: 32px;
		width: 212px;
		height: 56px;
	}

	.btn-burger {
		@include useFixedSize(48px, 48px);
		background-color: #0132d7;
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
			right: 15px;
			left: auto;
			transition: all 0.2s;
			opacity: 1;
			top: 0;
		}

		.d1 {
			margin-top: 17px;
		}

		.d2 {
			margin-top: 23px;
		}

		.d3 {
			width: 13px;
			margin-top: 29px;
		}

		&.opened {
			.d1 {
				margin-top: 23px;
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

@include screen1240 {
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

		.location-toggle {
			display: flex;
			align-items: center;
			flex-wrap: nowrap;
			width: 100px;
			height: 38px;
			border-radius: 10px;
			padding: 8px;
			gap: 8px;
			background-color: #f1f2f6;
			color: #6e6f72;

			.icon {
				color: #cfd2dd;
			}
		}
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

		.location-toggle {
			width: 130px;
			height: 48px;
			border-radius: 10px;
			padding: 12px;
			gap: 10px;
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
