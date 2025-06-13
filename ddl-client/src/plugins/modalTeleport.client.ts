export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('modal-teleport', {
		mounted(el: HTMLElement) {
			document.body.appendChild(el);
		},
		beforeUnmount(el: HTMLElement) {
			try {
				document.body.removeChild(el);
			} catch {}
		}
	});
});
