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
      regionalApiUrl: process.env.REGIONAL_API_URL || "/api",
      wordpressParentApiUrl: process.env.WORDPRESS_PARENT_API_URL || "/api",
      wordpressStoreApiUrl: process.env.WORDPRESS_STORE_API_URL || "/api",
      theme: process.env.THEME || "Regional",
      siteType: process.env.SITE_TYPE || "STORE",
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

      const { data: parentPages } = await useFetch(
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

      const { data: storePages } = await useFetch(
        config.public.wordpressStoreApiUrl,
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

      var pages = [...new Set([...parentPages.value, ...storePages.value])]


      if (pages) {
        pages.forEach((page) => {
          routes.push(page.uri);
        });
      }

      const GET_EVENTS = gql`
      query GetEvents {
        events {
          edges {
            node {
              slug
            }
          }
        }
      }
      `

      const { data: events } = await useFetch(
        config.public.wordpressStoreApiUrl,
        {
          key: "events",
          method: "post",
          body: {
            query: print(GET_EVENTS),
          },
          transform(data) {
            return data.data.events.edges.map((edge) => edge.node);
          },
        }
      );

      if (events.value) {
        events.value.forEach((event) => {
          routes.push(`/events/${event.slug}`);
        })
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

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "nuxt-swiper",
  ],
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
