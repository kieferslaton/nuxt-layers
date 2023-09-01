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
    },
  },

  generate: {
    routes: async () => {
      const routes = [];
      const config = useRuntimeConfig();

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

      const wpQuery = gql`
        query RoutesQuery {
          agents {
            edges {
              node {
                uri
                title(format: RENDERED)
                agentFields {
                  agentEmail
                  agentPhone
                  agentVideo
                  agentSocial {
                    socialLink
                    socialPlatform
                  }
                }
              }
            }
          }
        }
      `;

      const { data: wpData } = await useFetch(
        config.public.wordpressParentApiUrl,
        {
          key: "routes",
          method: "post",
          body: {
            query: print(wpQuery),
          },
          transform(data) {
            return data.data;
          },
        }
      );

      if (wpData) {
        if (wpData.agents) {
          wpData.agents.edges.forEach((edge) => {
            routes.push(`/agent/${edge.node.uri}`);
          });
        }
      }
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],
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
