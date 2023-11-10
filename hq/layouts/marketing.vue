<template>
  <header class="p-row lg:px-row2x absolute z-20 flex w-full items-center justify-center lg:h-[150px] lg:py-0">
    <img :src="currentLogo" alt="Logo" class="lg:w-[200px]" />
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
const theme = config.public.theme;

const currentLogo = computed(() => {
  const config = useRuntimeConfig();
  const theme = config.public.theme;
  let logoPath;

  switch (theme) {
    case "Regional":
      logoPath = "/logos/regional-logo-white.svg"
      break;
    case "Town and Country":
      logoPath = "/logos/tc-logo-white.svg"
      break;
    case "brandC":
      logoPath = "/logos/logo-brandC-white.svg"
      break;
    default:
      logoPath = "/logos/default-logo.svg"; // You can set a default logo if needed
      break;
  }

  return logoPath;
});

useHead({
  bodyAttrs: {
    class: computed(() =>
      isDark.value ? "bg-primary text-white" : "text-primary-dark"
    ),
  },
});
</script>
