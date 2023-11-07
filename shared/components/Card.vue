<template>
  <div :class="[classes, 'overflow-hidden rounded bg-primary-light']">
    <slot />
  </div>
</template>
<script setup>
const props = defineProps({
  classes: {
    type: String,
    default: "",
  },
});
</script>
