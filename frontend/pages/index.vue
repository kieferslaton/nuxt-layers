<template>
  <section
    class="px-row w-full h-screen flex flex-col justify-between items-center pt-36 pb-4 bg-[length:350vw] lg:pt-60 lg:justify-start lg:bg-cover"
    style="background-image: linear-gradient(to bottom, transparent 90%, #234C5C), url('/images/home-hero.png'); background-position: 40% 0;">
    <h1 class="text-center lg:w-[28rem]">Where houses become <span
        class="font-script text-7xl text-secondary lg:text-9xl">homes</span>
    </h1>
    <NuxtLink class="btn btn-secondary btn-full" to="/find-a-home">
      Search For A Home
    </NuxtLink>
  </section>
  <section class="px-row bg-primary text-white pt-16 pb-20 lg:px-row2x">
    <h4 class="smallcaps text-gray-light mb-4">Our Mission</h4>
    <h2 class="mb-6 lg:w-[55vw]">Make your home buying experience easy and enjoyable</h2>
    <h5 class="mb-16">Check out our featured homes.</h5>
    <div class="-mx-row lg:-mr-row2x lg:ml-0 relative">
      <div class="hidden absolute top-0 right-full h-full w-[10vw] lg:flex flex-col items-center justify-center gap-5">
        <button class="bg-white rounded-full h-8 w-8 flex items-center justify-center"
          :class="currentSwiperIndex === 0 && 'opacity-25'" @click="() => {
            if (currentSwiperIndex > 0) {
              swiperRef.slideTo(currentSwiperIndex - 1)
            }
          }">
          <Icon name="chevron_left" size="18" color="primary" />
        </button>
        <button class="bg-white rounded-full h-8 w-8 flex items-center justify-center"
          :class="currentSwiperIndex === homes.length && 'opacity-25'" @click="() => {
            if (currentSwiperIndex < homes.length) {
              swiperRef.slideTo(currentSwiperIndex + 1)
            }
          }">
          <Icon name="chevron_right" size="18" color="primary" />
        </button>
      </div>
      <ClientOnly>
        <Swiper @swiper="onSwiperReady" @slideChange="onSlideChange" :slides-per-view="1.15" :space-between="spaceBetween"
          :slides-offset-before="slidesOffset / 2 - 1" :slides-offset-after="slidesOffset" :breakpoints="{
            1024: {
              slidesPerView: 2.5
            }
          }
            ">
          <SwiperSlide v-for="( home, index ) in  homes " :key="index">
            <HomeCard :home="home" />
          </SwiperSlide>
        </Swiper>
        <div class="w-full flex justify-center mt-5 lg:hidden">
          <div class="h-[12px] w-[12px] mx-2 rounded-full" @click="() => swiperRef.slideTo(index)"
            :class="index === currentSwiperIndex ? 'bg-white' : 'bg-primary-dark'" v-for="( home, index ) in  homes "
            :key="index">
          </div>
        </div>
      </ClientOnly>
    </div>
  </section>
  <div class="flex flex-col bg-primary lg:flex-row lg:items-stretch lg:px-row2x lg:gap-[5vw]">
    <section
      class="px-16 pt-20 pb-96 flex flex-col items-center bg-[length:250%] bg-no-repeat bg-bottom lg:w-[45vw] lg:h-[50vw] lg:bg-cover"
      style="background-image: url('/images/home-homebuyers.png')">
      <h2 class="text-center uppercase mb-5 tracking-wider text-gray-dark lg:w-60"><span
          class="text-accent text-4xl normal-case font-script">The</span><br />
        Home
        Buyer's Guide
      </h2>
      <p class="text-center mb-7 lg:w-80">A step-by-step guide to help simplify your home buying experience.</p>
      <a href="/" class="btn btn-secondary">Start Learning Now</a>
    </section>
    <section class="px-row py-10 bg-primary lg:p-0 lg:w-[30vw]">
      <DealCard header="Save 10 - 20K" subheader="Inventory Reduction Sale" dates="Mar 3-4" link="/" />
    </section>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
const { data } = await useFetch('/api/homes?page=1&perPage=3');
const homes = data.value ? data.value.data.inventoryItems : [];
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