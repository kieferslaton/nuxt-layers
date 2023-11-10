<template>
  <Header
    :isDark="true"
    :isHeaderFixed="false"
    :currentItem="route.name"
    :siteType="props.siteType"
  />
  <slot />
  <Footer :siteType="props.siteType" />
</template>

<script setup>
const route = useRoute();
const props = useAttrs();

useHead({
  bodyAttrs: {
    class: "bg-primary text-white",
  },
});
</script>
