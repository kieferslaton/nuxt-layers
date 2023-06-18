<template>
  <!--TODO - Figure out how we want to handle these icons -->
  <span :class="filled ? 'material-icons' : 'material-symbols-outlined'" :style="{
    ['font-size']: sizes[size] || `${size}px`,
    color: color ? colors[color] : 'inherit',
  }">
    {{ name }}
  </span>
</template>

<script setup>
const colors = {
  'primary': '#234C5C',
  'primary-light': '#395E6D',
  'primary-lighter': '#5A7985',
  'secondary': '#3DBDFF',
  'gray-light': '#C8D2D6',
  'gray-dark': "#333333",
  'white': 'white'
};
const sizes = {
  'sm': '1rem',
  'md': '1.5rem',
  'lg': '2rem',
  'xl': '2.5rem',
}
const props = defineProps({
  name: String,
  color: String,
  size: String,
  filled: {
    type: Boolean,
    default: false
  }
});
</script>
