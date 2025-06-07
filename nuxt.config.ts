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
			modulePreload: false
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
			htmlAttrs: {
				lang: 'ru'
			},
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
		},
		pageTransition: { name: 'page', mode: 'out-in' }
	},
	compatibilityDate: '2025-05-15',
	devtools: { enabled: false },
	modules: [
		'@nuxt/eslint',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxtjs/seo'
		// [
		// 	'yandex-metrika-module-nuxt3',
		// 	{
		// 		id: process.env.YM_ID,
		// 		clickmap: true,
		// 		trackLinks: true,
		// 		accurateTrackBounce: true,
		// 		webvisor: true
		// 	}
		// ]
	],
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
			NUXT_PUBLIC_SITE_URL: process.env.NUXT_PUBLIC_SITE_URL
		}
	}
});
