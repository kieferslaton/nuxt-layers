<template>
  <div class="relative -mr-row mb-8 lg:-mr-row2x lg:ml-0">
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
        :slides-offset-after="slidesOffset"
        :breakpoints="{
          1024: {
            slidesPerView: 2.5,
          },
        }"
      >
        <SwiperSlide v-for="(home, index) in homes" :key="index">
          <HomeCard :home="home" class="shadow-lg" />
        </SwiperSlide>
      </Swiper>
      <div class="mt-5 flex w-full justify-center lg:hidden">
        <div
          class="mx-2 h-[12px] w-[12px] rounded-full"
          @click="() => swiperRef.slideTo(index)"
          :class="index === currentSwiperIndex ? 'bg-white' : 'bg-black/30'"
          v-for="(home, index) in homes"
          :key="index"
        ></div>
      </div>
    </ClientOnly>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide, useSwiper } from "swiper/vue";
import "swiper/swiper-bundle.css";

const { data: homeData } = await useFetch("/api/homes?page=1&perPage=3");
const homes = homeData.value.items;

//Swiper
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

  window.onresize = () => {
    slidesOffset.value = window.innerWidth * 0.1;
    spaceBetween.value = window.innerWidth * 0.05;
  };
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
