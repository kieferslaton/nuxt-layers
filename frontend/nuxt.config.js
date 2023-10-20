// https://nuxt.com/docs/api/configuration/nuxt-config
import gql from "graphql-tag";
import { print } from "graphql";

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
        {
          rel: "stylesheet",
          href: "https://cdn.plyr.io/3.7.8/plyr.css",
        },
      ],
      script: [
        {
          src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCrI98GTvPp-yGlhnVKX2sgGeexccPOKAk&libraries=places",
          defer: true,
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
      regionalApiUrl: process.env.REGIONAL_API_URL || "/api",
      wordpressParentApiUrl: process.env.WORDPRESS_PARENT_API_URL || "/api",
      theme: process.env.THEME || "Regional",
    },
  },

  generate: {
    routes: async () => {
      const routes = [];
      const config = useRuntimeConfig();

      const GET_PAGES = gql`
        query GetPages {
          pages {
            edges {
              node {
                uri
              }
            }
          }
        }
      `;

      const { data: pages } = await useFetch(
        config.public.wordpressParentApiUrl,
        {
          key: "pages",
          method: "post",
          body: {
            query: print(GET_PAGES),
          },
          transform(data) {
            return data.data.pages.edges.map((edge) => edge.node);
          },
        }
      );

      if (pages.value) {
        pages.value.forEach((page) => {
          routes.push(page.uri);
        });
      }

      const storeData = await $fetch(config.public.regionalApiUrl);

      if (storeData) {
        if (storeData.store) {
          if (storeData.store.inventoryItems) {
            storeData.store.inventoryItems.forEach((item) => {
              routes.push(`/home/${item.name.toLowerCase().replace(" ", "-")}`);
            });
          }
          if (storeData.store.salesTeam) {
            storeData.store.salesTeam.forEach((agent) => {
              routes.push(
                `/agent/${agent.firstName.toLowerCase()}-${agent.lastName.toLowerCase()}`
              );
            });
          }
        }
      }
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "nuxt-swiper"],
  swiper: {
    swiper: {
      modules: ["navigation"],
    },
  },
  imports: {
    dirs: ["composables", "composables/*/**"],
  },

  devtools: {
    enabled: false,
  },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
});
