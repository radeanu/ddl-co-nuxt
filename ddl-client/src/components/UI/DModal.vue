<template>
	<div v-modal-teleport class="modal-overlay">
		<div class="modal-wrapper" @click.self="handleClose">
			<div ref="modalContent" class="modal-content">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
export type DModalT = {
	closeOnBlur?: boolean;
};

const { togglePageOverflow } = useTogglePageOverflow();

const props = withDefaults(defineProps<DModalT>(), {
	closeOnBlur: true
});

const $emit = defineEmits<{ (e: 'close'): void }>();
const modalContent = useTemplateRef('modalContent');

onBeforeMount(() => {
	togglePageOverflow(false);
});

onBeforeUnmount(() => {
	togglePageOverflow(true);
});

function handleClose() {
	if (props.closeOnBlur) {
		$emit('close');
		return;
	}

	if (!modalContent.value) return;

	modalContent.value.style.transform = 'scale(1.05)';
	modalContent.value.style.transition = 'transform 0.2s ease-in-out';
	modalContent.value.addEventListener(
		'transitionend',
		() => {
			if (!modalContent.value) return;
			modalContent.value.style.transform = 'scale(1)';
		},
		{ once: true }
	);
}
</script>

<style lang="scss" scoped>
.modal-overlay {
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	width: 100dvw;
	height: 100dvh;
	overflow: hidden;
	position: absolute;
	z-index: var(--z-index-modal);
	background: #00000080;
}

.modal-wrapper {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow-y: auto;
	overflow-x: hidden;
}

.modal-content {
	transform: scale(1);
	animation-name: modalOpen;
	animation-duration: 0.3s;
}

@keyframes modalOpen {
	0% {
		transform: scale(0);
		opacity: 0;
	}

	100% {
		transform: scale(1);
		opacity: 1;
	}
}
</style>
