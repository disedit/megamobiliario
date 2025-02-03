// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: process.env.NUXT_PUBLIC_NODE_ENV === 'production' ? true : false,

  app: {
    head: {
      meta: [
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'mask-icon', color: '#652B80', href: '/safari-pinned-tab.svg' },
      ]
    }
  },

  runtimeConfig: {
    public: {
      baseUrl: 'https://megamobiliario.com',
      environment: 'preview'
    }
  },

  css: ['~/assets/scss/main.scss'],

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    ['@storyblok/nuxt', { accessToken: process.env.STORYBLOK_TOKEN }],
    '@nuxt/image'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/_variables.scss" as *;
            @use "@/assets/scss/_mixins.scss" as *;
            @use "@/assets/scss/_include-media.scss" as *;
          `
        }
      }
    }
  },

  i18n: {
    defaultLocale: 'es',
    locales: [
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.js' },
      { code: 'en', language: 'en', name: 'English', file: 'en.js' }
    ],
    lazy: true,
    langDir: '',
    baseUrl: 'https://megamobiliario.com',
    detectBrowserLanguage: false
  },

  image: {
    provider: 'storyblok',
    storyblok: {
      baseURL: 'https://a.storyblok.com'
    }
  },

  compatibilityDate: '2024-07-31'
})