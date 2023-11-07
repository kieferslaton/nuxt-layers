<template>
  <div>
    <Header :isDark="isDark" :isHeaderFixed="isHeaderFixed" :headerGradient="headerGradient" :currentItem="route.name"
      siteType="store" />
    <NuxtPage />
    <Footer :storeData="storeData" />
  </div>
</template>
<script setup>
const route = useRoute();
const isMobile = useIsMobile();
const isDark = useIsDark(route, isMobile.value);
const isHeaderFixed = useIsHeaderFixed(route, isMobile.value);
const headerGradient = useHasHeaderGradient(route);

const { data: storeData } = await useFetch("/api/locationinfo");
useHead({
  bodyAttrs: {
    class: computed(() =>
      isDark.value ? "bg-primary text-white" : "text-primary-dark"
    ),
  },
});
</script>
