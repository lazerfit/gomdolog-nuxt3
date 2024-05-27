// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", '@pinia/nuxt'],
  imports: {
    dirs: ['./stores']
  }, 
  alias: {
    'img': "/assets/img"
  },
  app: {
    head: {
      title: 'gomdolog',
      meta: [
        { name: 'description', content: 'Java/Spring/vue.js 관련 포스팅과 일상/맛집/블록체인을 다루는 개인 블로그입니다.' },
        { name: 'og:description', content: 'Java/Spring/vue.js 관련 포스팅과 일상/맛집/블록체인을 다루는 개인 블로그입니다.' },
        { name: 'og:image', content: "https://drive.google.com/uc?export=download&id=1-UuXrBcNtNBv45PvDGgjffDiKRT0gW7M" },
        { name: "og:locale", content: "ko_KR"}
      ],
      script: [
        { src: "https://kit.fontawesome.com/464ec02bb1.js",
          crossorigin: "anonymous"
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in'}
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
          @use "~/assets/scss/variables.scss" as *;
          @import "~/assets/scss/mixin.scss";
          `
        }
      }
    }
  }
});
