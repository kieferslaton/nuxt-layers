<template>
  <div>
    <Header :isDark="isDark" :isHeaderFixed="isHeaderFixed" />
    <NuxtPage />
    <Footer />
  </div>
</template>
<script setup>
const route = useRoute();
console.log(route.name)
const isDark = computed(() => route.name === 'find-a-home');
const isHeaderFixed = computed(() => route.name === 'index');

useHead({
  htmlAttrs: {
    style: 'font-size: 14px;'
  },
  bodyAttrs: {
    class: computed(() => (isDark.value ? 'bg-primary text-white' : 'text-primary'))
  }
});
</script>