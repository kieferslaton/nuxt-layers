<template>
  <div>
    <Header :isDark="isDark" :isHeaderFixed="isHeaderFixed" :headerGradient="headerGradient" :currentItem="route.name"
      siteType="HQ" />
    <NuxtPage />
    <Footer :storeData="storeData || null" />
  </div>
</template>
<script setup>
const route = useRoute();
const agent = await useFetch("/api/agent");
const isMobile = useIsMobile();
const isDark = useIsDark(route, isMobile.value);
const isHeaderFixed = useIsHeaderFixed(route, isMobile.value);
const headerGradient = useHasHeaderGradient(route);

useHead({
  bodyAttrs: {
    class: computed(() =>
      isDark.value ? "bg-primary text-white" : "text-primary-dark"
    ),
  },
});
</script>
