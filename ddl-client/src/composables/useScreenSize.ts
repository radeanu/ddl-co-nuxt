import { ref, readonly, onBeforeUnmount } from 'vue';

export function useScreeSize() {
	const screenWidth = ref(0);

	onMounted(() => {
		screenWidth.value = window.innerWidth;
		window.addEventListener('resize', resizeHandler);
	});

	onBeforeUnmount(() => cleanResizeListeners());

	function resizeHandler() {
		screenWidth.value = window.innerWidth;
	}

	function cleanResizeListeners() {
		window.removeEventListener('resize', resizeHandler);
	}

	return {
		screenWidth: readonly(screenWidth)
	};
}
