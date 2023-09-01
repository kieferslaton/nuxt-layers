<template>
  <section
    v-if="headerGradient"
    class="absolute left-0 top-0 z-10 w-full"
    :style="{
      height: headerGradient,
    }"
    style="
      background-image: linear-gradient(
        to bottom,
        white 0%,
        white 40%,
        transparent 100%
      );
    "
  ></section>
  <header
    class="masthead relative flex items-center justify-between p-row lg:relative lg:px-row2x lg:pt-14"
    :style="headerStyle"
  >
    <NuxtLink to="/" class="lg:left-row2x lg:absolute">
      <img
        :src="isDark && !isHeaderFixed ? logoWhite : logo"
        alt="Logo"
        class="lg:w-[200px]"
      />
    </NuxtLink>
    <Nav class="hidden lg:flex" :currentItem="currentItem" />
    <button
      @click.prevent="() => (showNav = true)"
      class="flex h-14 w-14 items-center justify-center rounded-[3px] border border-[#C8D2D6] lg:hidden"
    >
      <Icon
        name="menu"
        :color="isDark && !isHeaderFixed ? 'white' : 'primary'"
        size="lg"
      />
    </button>
  </header>
  <Transition @enter="onMobileNavEnter" @leave="onMobileNavLeave">
    <MobileNav @close="() => (showNav = false)" v-if="showNav" />
  </Transition>
</template>
<script setup>
import gsap from "gsap";
import logo from "~/assets/images/logo.svg";
import logoWhite from "~/assets/images/logo-white.svg";

const showNav = ref(false);
const props = defineProps({
  isDark: Boolean,
  isHeaderFixed: Boolean,
  headerGradient: Boolean,
  currentItem: String,
});

const headerStyle = computed(() => {
  return props.isHeaderFixed
    ? { position: "absolute", width: "100%", zIndex: "20" }
    : {};
});

function onMobileNavEnter(el) {
  gsap.from(el, {
    opacity: 0,
    duration: 0.25,
  });
}

function onMobileNavLeave(el, done) {
  console.log(el);
  gsap.to(el, {
    opacity: 0,
    duration: 0.25,
    onComplete: done,
  });
}
</script>
