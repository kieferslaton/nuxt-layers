<template>
  <div>
    <Header :isDark="isDark" :isHeaderFixed="isHeaderFixed" :hasHeaderGradient="hasHeaderGradient" />
    <NuxtPage />
    <Footer />
  </div>
</template>
<script setup>
const route = useRoute();
const isDark = computed(() => route.name === 'find-a-home');
const isHeaderFixed = computed(() => ['index', 'find-a-home-name'].includes(route.name));
const hasHeaderGradient = computed(() => route.name === 'find-a-home-name')
useHead({
  htmlAttrs: {
    style: 'font-size: 14px;'
  },
  bodyAttrs: {
    class: computed(() => (isDark.value ? 'bg-primary text-white' : 'text-primary'))
  }
});
</script>