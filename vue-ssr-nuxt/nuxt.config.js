module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'vue ssr nuxt',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, width=device-width, viewport-fit=cover'
      },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      {
        id: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: 'vue'
      },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'description', name: 'description', content: 'vue' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [{ rel: 'apple-touch-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    'mint-ui/lib/style.css',
    { src: '~assets/sass/common/_base.scss', lang: 'scss' }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~plugins/mint-ui', ssr: true }],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/proxy', '@nuxtjs/style-resources'],
  proxy: [['/api', { target: 'http://localhost:7878' }]],
  /*
   ** Build configuration
   */
  build: {
    // 防止被多次打包
    vendor: ['mint-ui', 'axios'],
    styleResources: {
      scss: './assets/sass/common/_variables.scss'
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
