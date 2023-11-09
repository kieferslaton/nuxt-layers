<template>
  <Header :isDark="false" :isHeaderFixed="false" :currentItem="route.name" :siteType="props.siteType" />
  <slot />
  <Footer :siteType="props.siteType" />
</template>

<script setup>
const route = useRoute();
const props = useAttrs();

useHead({
  bodyAttrs: {
    class: "text-primary-dark"
  },
});
</script>
