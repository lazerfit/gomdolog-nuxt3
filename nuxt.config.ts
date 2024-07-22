// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		'@nuxt/eslint',
		'@pinia/nuxt',
		'@nuxtjs/seo',
		'@vueuse/nuxt',
		'@nuxt/image',
	],
	imports: {
		dirs: ['./stores'],
	},
	plugins: ['~/plugins/dompurify.ts', '~/plugins/api.ts'],
	alias: {
		img: '/assets/img',
	},
	components: [
		{
			path: '~/components',
			pathPrefix: true,
		},
		{
			path: '~/components/common',
			pathPrefix: true,
		},
		{
			path: '~/components/header',
			pathPrefix: true,
		},
		{
			path: '~/components/post',
			pathPrefix: true,
		},
		{
			path: '~/components/admin',
			pathPrefix: true,
		},
	],
	app: {
		head: {
			link: [
				{
					rel: 'stylesheet',
					href: '//cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack.css',
				},
			],
			script: [
				{
					src: 'https://kit.fontawesome.com/464ec02bb1.js',
					crossorigin: 'anonymous',
				},
			],
		},
		pageTransition: { name: 'page', mode: 'out-in' },
	},
	site: {
		url: 'http://localhost:3000',
		name: 'gomdolog',
		description:
			'Java/Spring/vue.js 관련 포스팅과 일상/맛집/블록체인을 다루는 개인 블로그입니다.',
		defaultLocale: 'ko_KR',
	},
	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
			},
		},
	},
	css: ['~/assets/scss/main.scss'],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
          @import "~/assets/scss/variables.scss";
          @import "~/assets/scss/mixin.scss";
          `,
				},
			},
		},
	},
	routeRules: {
		'/': { prerender: true },
	},
	runtimeConfig: {
		public: {
			apiBase: process.env.API_BASE_URL,
		},
	},
	robots: {
		disallow: ['/admin', '/post/new'],
		allow: '/',
		blockNonSeoBots: true,
	},
	sitemap: {
		exclude: ['/admin', '/post/new'],
	},
});
