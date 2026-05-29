// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 5,
    typescriptBundlerResolution: true,
  },
  typescript: {
    tsConfig: {
      vueCompilerOptions: {
        plugins: ['@vue/language-plugin-pug'],
      },
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@bg-dev/nuxt-naiveui', '@pinia/nuxt', '@unocss/nuxt'],
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'zh-Hans',
    locales: [
      { code: 'en-US', files: ['en.json'] },
      { code: 'zh-Hans', files: ['zh-Hans.json'] },
    ],
  },
})
