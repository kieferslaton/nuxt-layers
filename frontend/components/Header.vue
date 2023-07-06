<template>
  <section v-if="hasHeaderGradient" class="absolute top-0 left-0 w-full h-52"
    style="background-image: linear-gradient(to bottom, white 0%, white 40%, transparent 100%)"></section>
  <header class="masthead flex justify-between items-center p-row relative lg:px-row2x lg:pt-14 lg:relative"
    :style="headerStyle">
    <NuxtLink to="/" class="lg:absolute lg:left-row2x">
      <img :src="isDark ? logoWhite : logo" alt="Logo" class="lg:w-[200px]" />
    </NuxtLink>
    <Nav class="hidden lg:flex" :currentItem="currentItem" />
    <button @click.prevent="() => showNav = true"
      class="h-14 w-14 flex items-center justify-center border border-gray-light rounded-[3px] lg:hidden">
      <Icon name="menu" :color="isDark ? 'white' : 'primary'" size="lg" />
    </button>
  </header>
  <Transition @enter="onMobileNavEnter" @leave="onMobileNavLeave">
    <MobileNav @close="() => showNav = false" v-if="showNav" />
  </Transition>
</template>
<script setup>
import gsap from 'gsap'
import logo from "~/assets/images/logo.svg";
import logoWhite from "~/assets/images/logo-white.svg";

const showNav = ref(false);
const props = defineProps({
  isDark: Boolean,
  isHeaderFixed: Boolean,
  hasHeaderGradient: Boolean,
  currentItem: String,
});

const headerStyle = computed(() => {
  return props.isHeaderFixed ? { position: 'absolute', width: '100%' } : {};
});

function onMobileNavEnter(el) {
  gsap.from(el, {
    opacity: 0,
    duration: 0.25,
  })
}

function onMobileNavLeave(el, done) {
  console.log(el)
  gsap.to(el, {
    opacity: 0,
    duration: 0.25,
    onComplete: done
  })
}
</script>
