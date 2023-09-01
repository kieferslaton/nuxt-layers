<template>
  <section
    class="flex h-screen w-full flex-col items-center justify-between bg-[length:400vw] px-row pb-4 pt-36 lg:justify-start lg:bg-cover lg:pt-60"
    style="
      background-image: linear-gradient(to bottom, transparent 90%, #234c5c),
        url('/images/homepage-hero.jpg');
      background-position: 35% 0;
    "
  >
    <div class="relative z-20">
      <h1 class="text-center lg:w-[28rem]">
        You Spoke.<br />
        <span class="font-script text-7xl text-secondary lg:text-9xl"
          >We Listened.</span
        >
      </h1>
      <p>3 bed, 2 bath homes starting at $48,900.</p>
    </div>
    <NuxtLink class="btn btn-secondary btn-full" to="/find-a-home">
      Search For A Home
    </NuxtLink>
  </section>
  <section
    class="bg-primary px-row pb-20 pt-16 text-white lg:px-row2x"
    v-if="homes && homes.length"
  >
    <h4 class="smallcaps mb-4 text-gray-light">Our Mission</h4>
    <h2 class="mb-6 lg:w-[55vw]">
      Make your home buying experience easy and enjoyable
    </h2>
    <h5 class="mb-16">Check out our featured homes.</h5>
    <div class="relative -mx-row lg:-mr-row2x lg:ml-0">
      <div
        class="absolute right-full top-0 hidden h-full w-[10vw] flex-col items-center justify-center gap-5 lg:flex"
      >
        <button
          class="flex h-8 w-8 items-center justify-center rounded-full bg-white"
          :class="currentSwiperIndex === 0 && 'opacity-25'"
          @click="
            () => {
              if (currentSwiperIndex > 0) {
                swiperRef.slideTo(currentSwiperIndex - 1);
              }
            }
          "
        >
          <Icon name="chevron_left" size="18" color="primary" />
        </button>
        <button
          class="flex h-8 w-8 items-center justify-center rounded-full bg-white"
          :class="currentSwiperIndex === homes.length && 'opacity-25'"
          @click="
            () => {
              if (currentSwiperIndex < homes.length) {
                swiperRef.slideTo(currentSwiperIndex + 1);
              }
            }
          "
        >
          <Icon name="chevron_right" size="18" color="primary" />
        </button>
      </div>
      <ClientOnly>
        <Swiper
          @swiper="onSwiperReady"
          @slideChange="onSlideChange"
          :slides-per-view="1.15"
          :space-between="spaceBetween"
          :slides-offset-before="slidesOffset / 2 - 1"
          :slides-offset-after="slidesOffset"
          :breakpoints="{
            1024: {
              slidesPerView: 2.5,
            },
          }"
        >
          <SwiperSlide v-for="(home, index) in homes" :key="index">
            <HomeCard :home="home" />
          </SwiperSlide>
        </Swiper>
        <div class="mt-5 flex w-full justify-center lg:hidden">
          <div
            class="mx-2 h-[12px] w-[12px] rounded-full"
            @click="() => swiperRef.slideTo(index)"
            :class="
              index === currentSwiperIndex ? 'bg-white' : 'bg-primary-dark'
            "
            v-for="(home, index) in homes"
            :key="index"
          ></div>
        </div>
      </ClientOnly>
    </div>
  </section>
  <div
    class="flex flex-col bg-primary lg:flex-row lg:items-stretch lg:gap-[5vw] lg:px-row2x"
  >
    <section
      class="flex flex-col items-center bg-[length:250%] bg-bottom bg-no-repeat px-16 pb-96 pt-20 lg:h-[50vw] lg:w-[45vw] lg:bg-cover"
      style="background-image: url('/images/home-homebuyers.png')"
    >
      <h2
        class="mb-5 text-center uppercase tracking-wider text-gray-dark lg:w-60"
      >
        <span class="font-script text-4xl normal-case text-accent">The</span
        ><br />
        Home Buyer's Guide
      </h2>
      <p class="mb-7 text-center lg:w-80">
        A step-by-step guide to help simplify your home buying experience.
      </p>
      <a href="/" class="btn btn-secondary">Start Learning Now</a>
    </section>
    <section class="bg-primary px-row py-10 lg:w-[30vw] lg:p-0">
      <DealCard
        header="Save 10 - 20K"
        subheader="Inventory Reduction Sale"
        dates="Mar 3-4"
        link="/"
      />
    </section>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide, useSwiper } from "swiper/vue";
import "swiper/swiper-bundle.css";
const { data } = await useFetch("/api/homes?page=1&perPage=3");
const homes = data.value.items;
const spaceBetween = ref(0);
const slidesOffset = ref(0);
const currentSwiperIndex = ref(0);
const swiperRef = ref();

const onSwiperReady = (swiper) => {
  swiperRef.value = swiper;
};

const onSlideChange = (swiper) => {
  currentSwiperIndex.value = swiper.activeIndex;
};

onMounted(() => {
  spaceBetween.value = window.innerWidth * 0.05;
  slidesOffset.value = window.innerWidth * 0.1;
});
</script>
<style lang="scss">
.swiper-pagination {
  bottom: 0 !important;
  width: 90vw !important;

  &-bullet {
    width: 12px !important;
    height: 12px !important;

    &-active {
      background-color: white !important;
    }
  }
}

.swiper-slide:last-child::after {
  content: "";
  display: block;
  width: 10%;
  /* Change this to the desired offset width */
  height: 100%;
}
</style>
