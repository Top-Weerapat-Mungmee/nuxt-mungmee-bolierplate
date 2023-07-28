import {
  auth,
  axios,
  build,
  eslint,
  googleFonts,
  head,
  i18n,
  privateRuntimeConfig,
  proxy,
  publicRuntimeConfig,
  pwa,
  router,
  storage,
  vuetify,
  vuetifyDialogue,
  webpackOptimisations,
  generate,
} from './config'

export default {
  css: ['element-ui/lib/theme-chalk/index.css'],
  plugins: ['@/plugins/vue-placeholders.ts', '@/plugins/element-ui.ts'],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    'nuxt-webpack-optimisations',
    '@nuxtjs/google-fonts',
    '@nuxtjs/composition-api/module',
  ],
  modules: [
    'vue-axios-http/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    'vuetify-dialogue/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/dayjs',
    '@nuxtjs/universal-storage',
    '@nuxtjs/component-cache',
    'vue-waiting/nuxt',
    'nuxt-vuex-router-sync',
  ],
  auth,
  axios,
  build,
  eslint,
  googleFonts,
  head,
  i18n,
  privateRuntimeConfig,
  proxy,
  publicRuntimeConfig,
  pwa,
  router,
  storage,
  vuetify,
  vuetifyDialogue,
  webpackOptimisations,
  generate,
}
