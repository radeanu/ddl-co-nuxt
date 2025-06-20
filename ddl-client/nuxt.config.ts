// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	srcDir: 'src/',
	ssr: true,
	sourcemap: true,
	nitro: {
		preset: 'static',
		compressPublicAssets: true,
		minify: true
	},
	vite: {
		build: {
			modulePreload: false,
			assetsInlineLimit: 0,
			cssMinify: true,
			cssCodeSplit: true
		},
		optimizeDeps: {
			exclude: ['@nuxt/image']
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
					additionalData: `@use "@/styles/_mixins.scss" as *;`
				}
			}
		}
	},
	css: ['@/styles/main.scss'],
	app: {
		baseURL: '/',
		head: {
			title: 'DDL - клининговая компания',
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			meta: [
				{
					name: 'apple-mobile-web-app-title',
					content: 'DDL'
				}
			],
			link: [
				{
					rel: 'icon',
					type: 'image/png',
					href: '/favicon-96x96.png',
					sizes: '96x96'
				},
				{
					rel: 'icon',
					type: 'image/svg+xml',
					href: '/favicon.svg'
				},
				{
					rel: 'shortcut icon',
					href: '/favicon.ico'
				},
				{
					rel: 'apple-touch-icon',
					sizes: '180x180',
					href: '/apple-touch-icon.png'
				},
				{
					rel: 'manifest',
					href: '/site.webmanifest'
				}
			]
		},
		pageTransition: { name: 'page', mode: 'out-in' }
	},
	$production: {
		app: {
			head: {
				meta: [
					{
						name: 'yandex-verification',
						content: '8c276e7366b6ea2f'
					}
				]
			}
		}
	},
	compatibilityDate: '2025-05-15',
	devtools: { enabled: false },
	modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@nuxtjs/seo'],
	image: {
		provider: 'ipx',
		ipx: {
			modifiers: {
				format: 'webp'
			}
		},
		formats: ['webp'],
		screens: {
			xs: 320,
			sm: 480,
			md: 768,
			lg: 1024,
			xl: 1240,
			xxl: 1440,
			'2xl': 1900
		}
	},
	icon: {
		clientBundle: {
			scan: true,
			includeCustomCollections: true,
			sizeLimitKb: 1240
		},
		componentName: 'NuxtIcon',
		customCollections: [
			{
				prefix: 'local',
				dir: './src/public/images/svg'
			}
		]
	},
	plugins: [
		{ src: '@/plugins/metrika.client.ts', mode: 'client' },
		'@/plugins/clickOutside.client.ts',
		'@/plugins/clickOutside.server.ts'
	],
	router: {
		options: {
			scrollBehaviorType: 'smooth'
		}
	},
	routeRules: {
		'/': {
			prerender: true,
			cors: true
		}
	},
	runtimeConfig: {
		public: {
			YM_ID: process.env.YM_ID,
			API_URL: process.env.API_URL,
			NUXT_PUBLIC_SITE_URL: process.env.NUXT_PUBLIC_SITE_URL
		}
	}
});
