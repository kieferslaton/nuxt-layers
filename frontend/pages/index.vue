<template>
  <section class="px-row w-full h-screen flex flex-col justify-between items-center pt-36 pb-4 bg-cover"
    style="background-image: linear-gradient(to bottom, transparent 90%, #234C5C), url('/images/home-hero.png'); background-position: 40% 0;">
    <h1 class="text-center">Where houses become <span class="font-script text-7xl text-secondary">homes</span></h1>
    <NuxtLink class="btn btn-secondary btn-full" to="/find-a-home">
      Search For A Home
    </NuxtLink>
  </section>
  <section class="px-row bg-primary text-white pt-16 pb-20">
    <Tag tag="Our Mission" class="mb-10" />
    <h2 class="mb-12">Make your home buying experience easy and enjoyable</h2>
    <h4 class="smallcaps text-gray-light mb-7">Featured Homes</h4>
    <div class="-mr-row">
      <ClientOnly>
        <Swiper @swiper="onSwiperReady" @slideChange="onSlideChange" :slides-per-view="1.1" :space-between="spaceBetween"
          :slides-offset-after="slidesOffset">
          <SwiperSlide v-for="(home, index) in homes" :key="index">
            <HomeCard :home="home" />
          </SwiperSlide>
        </Swiper>
        <div class="w-full flex justify-center mt-5">
          <div class="h-[12px] w-[12px] mx-2 rounded-full" @click="() => swiperRef.slideTo(index)"
            :class="index === currentSwiperIndex ? 'bg-white' : 'bg-primary-dark'" v-for="(home, index) in homes"
            :key="index">
          </div>
        </div>
      </ClientOnly>
    </div>
  </section>
  <section class="px-16 pt-20 pb-96 flex flex-col items-center bg-contain bg-no-repeat bg-bottom"
    style="background-image: url('/images/home-homebuyers.png')">
    <h2 class="text-center uppercase mb-5"><span class="text-accent text-4xl normal-case font-script">The</span><br />
      Home
      Buyer's Guide
    </h2>
    <p class="text-center mb-7">A step-by-step guide to help simplify your home buying experience.</p>
    <a href="/" class="btn btn-secondary">Start Learning Now</a>
  </section>
  <section class="px-row py-10 bg-primary">
    <DealCard header="Save 10 - 20K" subheader="Inventory Reduction Sale" dates="Mar 3-4" link="/" />
  </section>
</template>
<script setup>
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
const homesRef = ref([])
const { homes } = await getHomes(3);
homesRef.value = homes;
const spaceBetween = ref(0);
const slidesOffset = ref(0);
const currentSwiperIndex = ref(0);
const swiperRef = ref();

const onSwiperReady = (swiper) => {
  swiperRef.value = swiper;
}

const onSlideChange = (swiper) => {
  currentSwiperIndex.value = swiper.activeIndex
}

onMounted(() => {
  spaceBetween.value = window.innerWidth * 0.05;
  slidesOffset.value = window.innerWidth * 0.1;
})

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
  content: '';
  display: block;
  width: 10%;
  /* Change this to the desired offset width */
  height: 100%;
}
</style>