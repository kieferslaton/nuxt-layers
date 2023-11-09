<template>
  <section v-if="pageData"
    class="h-screen text-primary-dark w-full bg-[length:400vw] px-row pb-4 pt-36 lg:justify-start lg:bg-cover lg:pt-60"
    style="background-position: 35% 0" :style="{
      backgroundImage: `url('${pageData.featuredImage.node.sourceUrl}')`,
    }">
    <div class="absolute left-0 top-0 w-full h-2/3 bg-gradient-to-b from-white from-10% to-transparent"></div>
    <div class="absolute left-0 bottom-0 w-full h-40 bg-gradient-to-b from-transparent to-primary z-10"></div>
    <div class="relative z-20 h-full w-full flex flex-col items-center justify-between">
      <div>
        <h1 class="text-center lg:w-[28rem]">
          {{ pageData.homepage.heroHeadline.normal }}<br />
          <span class="font-script text-7xl text-secondary lg:text-9xl">{{
            pageData.homepage.heroHeadline.script
          }}</span>
        </h1>
        <p>{{ pageData.homepage.heroHeadline.subheader }}</p>
      </div>
      <LocationsAutocomplete @update:location="handleLocationUpdate" />
    </div>
  </section>
  <section class="bg-primary px-row pb-20 pt-16 text-white lg:px-row2x">
    <h4 class="smallcaps mb-4 text-gray-light">Our Mission</h4>
    <h2 class="mb-6 lg:w-[55vw]">
      {{ pageData.homepage.mission.header }}
    </h2>
    <h5 class="mb-16">{{ pageData.homepage.mission.subheader }}</h5>
    <FeaturedHomes />
    <Map :locations="locations" class="mt-16 mb-4" />
    <h2 class="mb-4 lg:w-[55vw] text-4xl">
      Find a Location Near You
    </h2>
    <p class="mb-4">With over 40 locations across the south, lorem ipsum dolor sit amet consectetur elit.</p>
    <NuxtLink class="btn btn-secondary btn-full" to="/locations">
      View All Locations
    </NuxtLink>
  </section>
  <div class="flex flex-col bg-primary lg:flex-row lg:items-stretch lg:gap-[5vw] lg:px-row2x">
    <section
      class="flex flex-col items-center bg-[length:250%] bg-bottom bg-no-repeat px-16 pb-96 pt-20 lg:h-[50vw] lg:w-[45vw] lg:bg-cover"
      :style="{
        backgroundImage: `url('${pageData.homepage.homebuyersGuide.background.sourceUrl}')`,
      }">
      <h2 class="mb-5 text-center uppercase tracking-wider text-gray-dark lg:w-60">
        <span class="font-script text-4xl normal-case text-accent">The</span><br />
        Home Buyer's Guide
      </h2>
      <p class="mb-7 text-center lg:w-80">
        {{ pageData.homepage.homebuyersGuide.subheader }}
      </p>
      <NuxtLink href="/homebuyers-guide" class="btn btn-secondary">Start Learning Now</NuxtLink>
    </section>
    <section class="bg-primary px-row py-10 lg:w-[30vw] lg:p-0">
      <DealCard header="Save 10 - 20K" subheader="Inventory Reduction Sale" dates="Mar 3-4" link="/" />
    </section>
  </div>
</template>
<script setup>
//Data Fetch
const { data: pageData } = await getHome();

const locations = ref([]);

definePageMeta({
  layout: 'fixed-header'
})

await $fetch('/api/locations').then(res => {
  locations.value = res;
})

async function handleLocationUpdate(location) {
  await navigateTo({
    path: '/locations',
    query: {
      place_id: location.place_id
    }
  })
}
</script>
