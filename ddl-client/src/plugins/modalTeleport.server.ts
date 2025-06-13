export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('modal-teleport', {
		mounted(el: HTMLElement) {},
		beforeUnmount(el: HTMLElement) {}
	});
});
