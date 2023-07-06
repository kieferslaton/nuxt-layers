<template>
  <div>
    <Header :isDark="isDark" :isHeaderFixed="isHeaderFixed" :hasHeaderGradient="hasHeaderGradient"
      :currentItem="route.name" />
    <NuxtPage />
    <Footer />
  </div>
</template>
<script setup>
const route = useRoute();
const isDark = useIsDark(route);
const isHeaderFixed = useIsHeaderFixed(route);
const hasHeaderGradient = useHasHeaderGradient(route);
useHead({
  bodyAttrs: {
    class: computed(() => (isDark.value ? 'bg-primary text-white' : 'text-primary'))
  }
});
</script>