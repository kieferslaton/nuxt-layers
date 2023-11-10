<template>
  <Header
    :isDark="darkHeader"
    :isHeaderFixed="true"
    :currentItem="route.name"
    :siteType="props.siteType"
  />
  <slot />
  <Footer :siteType="props.siteType" />
</template>

<script setup>
const route = useRoute();
const props = useAttrs();

const darkHeader = computed(() => {
  return route.name === "about-us-services";
});

useHead({
  bodyAttrs: {
    class: "bg-primary text-primary",
  },
});
</script>
