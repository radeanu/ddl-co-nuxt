export default defineNitroPlugin((nitroApp) => {
	nitroApp.hooks.hook('render:html', (html) => {
		html.htmlAttrs = ['lang="ru"'];
	});
});
