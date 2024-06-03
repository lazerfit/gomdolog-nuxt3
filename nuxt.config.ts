// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", '@pinia/nuxt', "@nuxtjs/seo", "@vueuse/nuxt"],
  imports: {
    dirs: ['./stores']
  }, 
  alias: {
    'img': "/assets/img"
  },
  components: [
    {
      path: '~/components',
      pathPrefix: true
    },
    {
      path: '~/components/common',
      pathPrefix: true
    },
    {
      path: '~/components/header',
      pathPrefix: true
    },
    {
      path: '~/components/post',
      pathPrefix: true
    },
    {
      path: '~/components/admin',
      pathPrefix: true
    },
  ],
  app: {
    head: {
      link: [],
      script: [
        { src: "https://kit.fontawesome.com/464ec02bb1.js",
          crossorigin: "anonymous"
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in'}
  },
  site: {
    url: 'https://gomdolog.vercel.app',
    name: 'gomdolog',
    description: 'Java/Spring/vue.js 관련 포스팅과 일상/맛집/블록체인을 다루는 개인 블로그입니다.',
    defaultLocale: 'ko_KR'
  },
  eslint: {
    config: {
      stylistic: true,
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
          `
        }
      }
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/api/*': { cache: { maxAge: 0 } },
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://gomdolog.store/api'
    }
  },
  robots:{
    disallow: ['/admin', '/post/new'],
    allow: '/',
    blockNonSeoBots: true,
  },
  sitemap: {
    exclude: ['/admin', '/post/new']
  }
});