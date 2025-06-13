export default function useTogglePageOverflow() {
	const overflowPos = ref(0);

	function togglePageOverflow(display: boolean) {
		const overflowNode = document.getElementById('__nuxt');
		if (!overflowNode) return;
		overflowNode.style.overflowX = 'clip';
		if (!display) {
			overflowPos.value =
				window.pageYOffset || document.documentElement.scrollTop;
			overflowNode.style.position = 'fixed';
			overflowNode.style.top = `-${overflowPos.value}px`;
		} else {
			overflowNode.style.overflowY = '';
			overflowNode.style.position = '';
			overflowNode.style.top = '';
			window.scrollTo({
				top: overflowPos.value,
				left: 0,
				behavior: 'instant'
			});
		}
	}

	return {
		togglePageOverflow
	};
}
