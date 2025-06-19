<template>
	<div
		v-show="dLocation"
		class="location-toggle"
		:class="{ open: dList }"
		v-click-outside="() => (dList = false)"
	>
		<button type="button" class="btn" @click="dList = !dList">
			<UIDIcon name="pin" />
			<span>{{ selected?.name }}</span>
		</button>

		<ul v-if="dList" class="list">
			<li
				v-for="loc in LOCATIONS"
				:class="{
					item: true,
					selected: selected?.value === loc.value
				}"
				@click="handleSelect(loc)"
			>
				{{ loc.name }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { LOCATIONS } from '@/common/constants';
import { useLocalStorage } from '@/composables/useLocalStorage';

const storage = useLocalStorage();

const selected = ref<(typeof LOCATIONS)[number]>(LOCATIONS[0]);

const dLocation = ref(false);
const dList = ref(false);

onMounted(() => {
	const value = storage.getItem('loc');

	if (!value) {
		storage.setItem('loc', LOCATIONS[0].value);
	}

	syncSelected();
	dLocation.value = true;
});

function syncSelected() {
	const value = storage.getItem('loc');
	if (!value) return;

	const item = LOCATIONS.find((v) => v.value === value);

	selected.value = item ? item : LOCATIONS[0];
}

function handleSelect(loc: (typeof LOCATIONS)[number]) {
	storage.setItem('loc', loc.value);
	syncSelected();
	dList.value = false;
}
</script>

<style lang="scss" scoped>
.location-toggle {
	position: relative;
	width: fit-content;
	border-radius: 32px;
	background-color: #ffffff;
	color: #1a1a1a;
	border: 1px solid #808080;
	font-weight: 600;
	font-size: 14px;
	line-height: 20px;
	transition: all 0.2s;
	z-index: var(--z-index-dropdown-list);

	&.open {
		border-radius: 12px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		border-bottom-color: #ffffff;
	}
}

.btn {
	gap: 8px;
	padding: 0 16px;
	height: 44px;

	.icon {
		color: #bfbfbf;
	}
}

.list {
	position: absolute;
	display: flex;
	flex-direction: column;
	max-height: 200px;
	overflow: auto;
	top: 100%;
	left: -1px;
	width: calc(100% + 2px);
	background-color: #ffffff;
	border: 1px solid #808080;
	border-radius: 12px;
	border-top: 0;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
	padding-block: 0 5px;
}

.item {
	padding: 8px 16px;
	cursor: pointer;

	&:hover,
	&.selected {
		background-color: #f2f2f2;
	}

	&.selected {
		pointer-events: none;
	}
}
</style>
