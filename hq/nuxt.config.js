export default defineNuxtConfig({
  extends: ["../shared"],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || "/api",
      wordpressParentApiUrl: process.env.WORDPRESS_PARENT_API_URL || "/api",
      wordpressStoreApiUrl: process.env.WORDPRESS_STORE_API_URL || "/api",
      theme: process.env.THEME || "BrandA",
      siteType: process.env.SITE_TYPE || "STORE",
    },
  },
  imports: {
    dirs: ["composables", "composables/*/**"],
  },
});
