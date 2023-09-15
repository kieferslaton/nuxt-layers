<template>
  <!--TODO - Figure out how we want to handle these icons -->
  <span
    :class="[
      filled ? 'material-icons' : 'material-symbols-outlined',
      `text-${color}`,
    ]"
    :style="{
      ['font-size']: sizes[size] || `${size}px`,
    }"
  >
    {{ name }}
  </span>
</template>

<script setup>
const sizes = {
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
  xl: "2.5rem",
};
const props = defineProps({
  name: String,
  color: String,
  size: String,
  filled: {
    type: Boolean,
    default: false,
  },
});
</script>
