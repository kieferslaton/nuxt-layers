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
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
      script: [
        {
          src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCrI98GTvPp-yGlhnVKX2sgGeexccPOKAk&libraries=places",
          defer: true,
        },
      ],
    },
  },
  css: ["~/assets/css/style.scss"],

  runtimeConfig: {
    public: {
      regionalApiUrl: process.env.REGIONAL_API_URL || "/api",
    },
  },

  generate: {
    routes: async () => {
      const routes = [];
      const config = useRuntimeConfig();

      //Inventory Routes
      const { data } = await useFetch(
        `${config.public.regionalApiUrl}/search?storeId=1&page=1&perPage=50`
      );
      if (data) {
        data.inventoryItems.forEach((item) => {
          routes.push(
            `/find-a-home/${item.name.toLowerCase().replace(" ", "-")}`
          );
        });
      }
    },
  },

  modules: ["@nuxtjs/tailwindcss"],
  imports: {
    dirs: ["composables", "composables/*/**"],
  },

  devtools: {
    enabled: true,
  },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
});
