<template>
  <header class="masthead flex justify-between items-center p-row"
    :style="isHeaderFixed && 'position: absolute; width: 100%;'">
    <NuxtLink to="/">
      <img :src="isDark ? logoWhite : logo" alt="Logo" />
    </NuxtLink>
    <button @click.prevent="() => showNav = true"
      class="h-14 w-14 flex items-center justify-center border border-gray-light rounded-[3px]">
      <Icon name="menu" :color="isDark ? 'white' : 'primary'" size="lg" />
    </button>
  </header>
  <Nav @close="() => showNav = false" v-if="showNav" />
</template>
<script setup>
import logo from "~/assets/images/logo.svg";
import logoWhite from "~/assets/images/logo-white.svg";

const showNav = ref(false);
const props = defineProps({
  isDark: Boolean,
  isHeaderFixed: Boolean,
});
</script>
