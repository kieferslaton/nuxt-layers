export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.plyr.io/3.7.8/plyr.css",
        },
      ],
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`,
          defer: true,
          async: true,
        },
        {
          src: "https://www.youtube.com/iframe_api",
          defer: true,
        },
      ],
    },
  },
  css: ["~/assets/css/style.scss"],

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || "/api",
      wordpressParentApiUrl: process.env.WORDPRESS_PARENT_API_URL || "/api",
      wordpressStoreApiUrl: process.env.WORDPRESS_STORE_API_URL || "/api",
      theme: process.env.THEME || "BrandA",
      siteType: process.env.SITE_TYPE || "STORE",
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "nuxt-swiper"],
  schemaOrg: {
    meta: {
      host: "http://localhost:3000",
    },
  },
  swiper: {
    swiper: {
      modules: ["navigation"],
    },
  },
  imports: {
    dirs: ["composables", "composables/*/**"],
  },
});
