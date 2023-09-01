<template>
  <div>
    <Header
      :isDark="isDark"
      :isHeaderFixed="isHeaderFixed"
      :hasHeaderGradient="hasHeaderGradient"
      :currentItem="route.name"
    />
    <NuxtPage />
    <Footer :storeData="storeData" />
  </div>
</template>
<script setup>
const route = useRoute();
const isMobile = useIsMobile();
const isDark = useIsDark(route, isMobile.value);
const isHeaderFixed = useIsHeaderFixed(route, isMobile.value);
const hasHeaderGradient = useHasHeaderGradient(route);

const { data: storeData } = await useFetch("/api/locationinfo");
console.log(storeData.value);
useHead({
  bodyAttrs: {
    class: computed(() =>
      isDark.value ? "bg-primary text-white" : "text-primary-dark"
    ),
  },
});
</script>
