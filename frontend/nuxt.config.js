// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: "stylesheet", href: "https://use.typekit.net/gsj6mqz.css" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons"
        }
      ],
    },
  },
  css: [
    '~/assets/css/style.scss',
  ],
  
  runtimeConfig: {
    public: {
      regionalApiUrl: process.env.REGIONAL_API_URL || '/api'
    }
  }, 

  modules: ['@nuxtjs/tailwindcss'],
  imports: {
    dirs: ['composables', 'composables/*/**']
  },

  devtools: {
    enabled: true
  }, 
  devServer: {
    host: '0.0.0.0', 
    port: 3000,
  }
});
