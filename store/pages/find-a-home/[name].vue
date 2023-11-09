<template>
  <div class="home-single" v-if="home">
    <section @click="() => (showImagesModal = true)" class="relative z-0 h-[70vh] w-full bg-cover bg-center tl:h-[75vh]"
      :style="{
        backgroundImage: `url('${home.defaultImageUrl}')`,
      }">
      <div class="absolute left-0 top-0 w-full h-2/3 bg-gradient-to-b from-white to-transparent"></div>
      <button
        class="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center rounded bg-gray-dark px-4 py-2 text-xs tracking-widest"
        v-if="home.images && home.images.length > 1">
        <Icon name="image" size="12" color="white" class="mr-2" filled />
        1 / {{ home.images.length }}
      </button>
    </section>
    <section
      class="border-b border-primary bg-primary px-row pb-10 pt-12 text-white lg:flex lg:items-end lg:justify-between lg:bg-transparent lg:px-row2x">
      <div>
        <h2 class="mb-4 lg:text-7xl">{{ home.name }}</h2>
        <p class="smallcaps mb-5 text-gray-light">
          Built By <a class="underline" href="#">Hamilton</a>
        </p>
        <div class="mb-10 flex w-full justify-between lg:mb-0">
          <span>{{ home.beds }} Bed / {{ home.baths }}Bath /
            {{ home.length * home.width }}ft<sup>2</sup></span>
          <span class="font-bold">{{ home.category }}</span>
        </div>
      </div>
      <div class="flex w-full justify-between gap-5 lg:w-auto">
        <a href="" class="btn btn-secondary flex flex-1 items-center">
          <Icon name="phone" size="20" color="white" filled class="mr-3" />
          Call Us
        </a>
        <a href="" class="btn btn-transparent flex items-center">
          <Icon name="check" size="20" color="white" filled class="mr-3" />
          Get Prequalified
        </a>
      </div>
    </section>
    <section class="flex flex-col items-center bg-primary px-row pb-20 pt-10 lg:px-row2x">
      <div class="mb-20 rounded bg-white px-row py-row">
        <div class="flex flex-col lg:flex-row-reverse lg:gap-20">
          <img src="/images/home-single-illo.png" class="mb-5 w-full shrink-0 lg:basis-[40%]" />
          <div>
            <h6 class="mb-4">Description</h6>
            <p class="mb-7 text-gray-dark">
              This home maximizes space and lighting in areas you need it most.
              It features a quality design and a unique layout, with a price
              you’re sure to love! And don’t forget, customization options are
              available to make this home truly one-of-a-kind.
            </p>
            <div class="lg:flex lg:items-center lg:gap-8">
              <a class="btn btn-secondary-transparent btn-full mb-5 flex items-center lg:mb-0 lg:px-4" href="#">
                <Icon name="360" size="18" color="secondary" class="mr-3" />
                Take 3D Tour
              </a>
              <a class="btn btn-secondary-transparent btn-full mb-16 flex items-center lg:mb-0 lg:px-4" href="#">
                <Icon name="grid_on" size="18" color="secondary" class="mr-3" />
                View Floor Plan
              </a>
            </div>
          </div>
        </div>
        <h6 class="lg:mt-row2x">Floor Plan Specifications</h6>
        <Accordion :items="items" v-if="isMobile" itemClasses="py-5" headerClasses="text-gray-dark" />
        <Tabs :items="items" v-else />
      </div>
      <a class="btn btn-transparent btn-auto flex items-center border-primary-lighter" href="/find-a-home">
        <Icon name="keyboard_arrow_left" color="secondary" size="16" class="mr-3" />
        Back to Home Search
      </a>
    </section>
    <div class="fixed left-0 top-0 z-50 h-screen w-screen bg-black" v-if="showImagesModal">
      <ClientOnly>
        <Swiper class="relative h-full" @slideChange="onSlideChange" :modules="[SwiperNavigation]" :navigation="{
          nextEl: '.swiper-btn-next',
          prevEl: '.swiper-btn-prev',
        }">
          <SwiperSlide v-for="image in home.images" :key="image" class="flex h-full flex-col justify-center"
            style="display: flex !important">
            <NuxtImg :src="image.url" class="mb-row" />
            <p class="ml-row text-white">{{ image.description }}</p>
          </SwiperSlide>
          <div
            class="swiper-btn-next absolute right-4 top-1/2 z-10 hidden h-14 w-14 items-center justify-center rounded-full bg-gray-dark tp:flex">
            <Icon name="arrow_forward_ios" size="20" color="white" />
          </div>
          <div
            class="swiper-btn-prev absolute left-4 top-1/2 z-10 hidden h-14 w-14 items-center justify-center rounded-full bg-gray-dark tp:flex">
            <Icon name="arrow_back_ios" size="20" color="white" class="ml-[0.4rem]" />
          </div>
        </Swiper>
      </ClientOnly>
      <div
        class="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center justify-center rounded px-4 py-2 text-xs tracking-widest lg:bg-gray-dark">
        <Icon name="image" size="12" color="white" class="mr-2" filled />
        {{ currentImageSlide }} / {{ home.images.length }}
      </div>
      <button
        class="absolute right-6 top-6 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/70 transition-colors hover:bg-secondary/100"
        @click="() => (showImagesModal = false)">
        <Icon name="close" size="20" color="white" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

definePageMeta({
  layout: 'fixed-header'
})

const route = useRoute();
const isMobile = useIsMobile();
const { data: home } = await useFetch(`/api/home?name=${route.params.name}`);

console.log(home.value);

useSeoMeta({});

// useSchemaOrg([
//   defineWebPage({
//     headline: home.value.title,
//     description: home.value.description,
//     primaryImageOfPage: home.value.defaultImageUrl,
//   }),
//   defineProduct({
//     brand: "Regional Homes",
//     description: home.value.description,
//     additonalProperty:
//       home.value.beds +
//       " bed, " +
//       home.value.baths +
//       " bath, " +
//       home.value.width +
//       " x " +
//       home.value.length +
//       ", Built by " +
//       home.value.manufacturerName,
//   }),
//   defineItemList({
//     itemListElement: [
//       {
//         name: home.value.beds + " beds",
//       },
//       {
//         name: home.value.baths + " baths",
//       },
//       {
//         name: home.value.width + "' width",
//       },
//       {
//         name: home.value.length + "' length",
//       },
//       {
//         name: "Built by " + home.value.manufacturerName,
//       },
//     ],
//   }),
//   defineWebSite({
//     name: "Regional Homes - America’s #1 Independent Manufactured Housing Dealer",
//     url: "https://regionalhomes.net/",
//   }),
//   defineOrganization({
//     name: "Regional Homes",
//     url: "https://regionalhomes.net/",
//     keywords:
//       "mobile homes, modular homes, manufactured homes, prefabricated homes, trailer homes, used mobile homes, mobile home dealers, double wide mobile homes, double wide trailers, new mobile homes, single wide mobile homes, triple wide mobile homes",
//   }),
//   defineAddress({
//     city: "Pearl",
//     state: "MS",
//   }),
// ]);

const showImagesModal = ref(false);
const currentImageSlide = ref(1);

const onSlideChange = (swiper) => {
  console.log(swiper.activeIndex);
  currentImageSlide.value = swiper.activeIndex + 1;
};

const items = [
  {
    header: "Baths",
    icon: "baths",
    content: `
        <div>
            <h6>Bathroom Additional Specs: </h6>
            <ul>
                <li>Efficiently Designed Bathroom Layouts</li>
                <li>Large Mirrors at Sink Locations</li>
                <li>GFCI Recepts in Convenient Locations</li>
            </ul>
        </div>
        <div>
            <h6>Bathroom Fans:</h6>
            <ul>
                <li>Powerful Exhaust Fans in All Baths</li>
            </ul>
        </div>
        <div>
            <h6>Bathroom Flooring:</h6>
            <ul>
                <li>Bath Friendly Vinyl Flooring</li>
            </ul>
        </div>
        <div>
            <h6>Bathroom Shower:</h6>
            <ul>
                <li>54" Tub/Shower in Guest Bathrooms</li>
                <li>48" Separate Show in MBA Glamour Bath</li>
            </ul>
        </div>
        <div>
            <h6>Bathroom Toilet Type:</h6>
            <ul>
                <li>Water Saver Commodes</li>
            </ul>
        </div>
        `,
  },
  {
    header: "Construction",
    icon: "construction",
    content: `
        <div>
            <h6>Construction Additional Specs: </h6>
            <ul>
                <li>High-Quality Construction Materials</li>
                <li>Structurally Sound Design</li>
                <li>Experienced Construction Team</li>
            </ul>
        </div>
        `,
  },
  {
    header: "Exterior",
    icon: "exterior",
    content: `
        <div>
            <h6>Exterior Additional Specs: </h6>
            <ul>
                <li>Stylish and Modern Exterior Design</li>
                <li>Durable Siding and Roofing Materials</li>
                <li>Well-Maintained Landscaping</li>
            </ul>
        </div>
        `,
  },
  {
    header: "Interior",
    icon: "interior",
    content: `
        <div>
            <h6>Interior Additional Specs: </h6>
            <ul>
                <li>Thoughtfully Designed Interiors</li>
                <li>Spacious Living Areas</li>
                <li>Quality Flooring and Finishes</li>
            </ul>
        </div>
        `,
  },
  {
    header: "Kitchen",
    icon: "kitchen",
    content: `
        <div>
            <h6>Kitchen Additional Specs: </h6>
            <ul>
                <li>Modern Kitchen Design</li>
                <li>High-Quality Cabinetry and Countertops</li>
                <li>Energy-Efficient Appliances</li>
            </ul>
        </div>
        `,
  },
  {
    header: "Utilities",
    icon: "utilities",
    content: `
        <div>
            <h6>Utilities Additional Specs: </h6>
            <ul>
                <li>Reliable and Efficient Utility Services</li>
                <li>Properly Installed Electrical and Plumbing Systems</li>
                <li>Energy-Efficient Heating and Cooling</li>
            </ul>
        </div>
        `,
  },
];
</script>
