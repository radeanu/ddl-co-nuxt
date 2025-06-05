// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt().overrideRules({
	'@typescript-eslint/no-unused-vars': 'warn',
	'no-debugger': 'off',
	'no-console':
		process.env.NODE_ENV !== 'development'
			? ['warn', { allow: ['error'] }]
			: 'off',
	'vue/html-self-closing': 'off',
	'vue/max-attributes-per-line': [
		'warn',
		{
			singleline: 20,
			multiline: 1
		}
	],
	'vue/camelcase': [
		'error',
		{
			ignoreDestructuring: true,
			properties: 'never'
		}
	],
	camelcase: [
		'error',
		{
			ignoreDestructuring: true,
			properties: 'never'
		}
	]
});
