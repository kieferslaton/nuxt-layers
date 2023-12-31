<template>
  <section v-if="headerGradient" class="absolute left-0 top-0 z-10 w-full" :style="{
    height: headerGradient,
  }" style="
      background-image: linear-gradient(
        to bottom,
        white 0%,
        white 40%,
        transparent 100%
      );
    "></section>
  <header class="masthead relative flex items-center justify-between p-row lg:relative lg:h-[150px] lg:px-row2x lg:py-0"
    :style="headerStyle">
    <NuxtLink to="/" class="lg:left-row2x self-center lg:absolute">
      <img :src="currentLogo" alt="Logo" class="lg:w-[200px]" />
    </NuxtLink>
    <Nav class="hidden lg:flex" :currentItem="currentItem" />
    <button @click.prevent="() => (showNav = true)"
      class="flex h-14 w-14 items-center justify-center rounded-[3px] border border-[#C8D2D6] lg:hidden">
      <Icon name="menu" :color="isDark ? 'white' : 'primary'" size="lg" />
    </button>
  </header>
  <Transition @enter="onMobileNavEnter" @leave="onMobileNavLeave">
    <MobileNav @close="() => (showNav = false)" v-if="showNav" :menuItems="menuItems" />
  </Transition>
</template>
<script setup>
import gsap from "gsap";

const showNav = ref(false);
const props = defineProps({
  isDark: Boolean,
  isHeaderFixed: Boolean,
  headerGradient: Boolean,
  currentItem: String,
  siteType: String
});

const { data: menuItems } = await getMenu('Main Navigation', props.siteType);

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
  gsap.to(el, {
    opacity: 0,
    duration: 0.25,
    onComplete: done,
  });
}

const currentLogo = computed(() => {
  const config = useRuntimeConfig();
  const theme = config.public.theme;
  let logoPath;

  switch (theme) {
    case "BrandA":
      logoPath =
        props.isDark
          ? "/logos/logo-white.svg"
          : "/logos/logo.svg";
      break;
    case "BrandB":
      logoPath =
        props.isDark
          ? "/logos/tc-logo-white.svg"
          : "/logos/tc-logo.svg";
      break;
    case "brandC":
      logoPath =
        props.isDark
          ? "/logos/logo-brandC-white.svg"
          : "/logos/logo-brandC.svg";
      break;
    default:
      logoPath = "/logos/default-logo.svg"; // You can set a default logo if needed
      break;
  }

  return logoPath;
});
</script>
