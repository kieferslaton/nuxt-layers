<template>
  <header
    class="p-row lg:px-row2x absolute z-20 flex w-full items-center justify-center lg:h-[150px] lg:py-0"
  >
    <img src="/logos/regional-logo-white.svg" alt="Logo" class="lg:w-[200px]" />
  </header>
  <main>
    <slot />
  </main>
  <Footer :storeData="storeData || null" />
</template>

<script setup>
const route = useRoute();
const isMobile = useIsMobile();
const isDark = useIsDark(route, isMobile.value);

useHead({
  bodyAttrs: {
    class: computed(() =>
      isDark.value ? "bg-primary text-white" : "text-primary-dark"
    ),
  },
});
</script>
