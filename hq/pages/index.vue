<template>
  <section
    v-if="pageData"
    class="text-primary-dark px-row relative flex h-screen min-h-[600px] w-full items-start bg-[length:auto_120%] bg-[center_bottom_110%] bg-no-repeat pt-36 lg:items-center lg:bg-cover lg:bg-center lg:pt-0"
    :style="{
      backgroundImage: `url('${pageData.featuredImage.node.sourceUrl}')`,
    }"
  >
    <div
      class="absolute left-0 top-0 h-2/3 w-full bg-gradient-to-b from-white from-20% to-transparent"
    ></div>
    <div
      class="to-primary absolute bottom-0 left-0 z-10 h-80 w-full bg-gradient-to-b from-transparent"
    ></div>
    <div
      class="px-row absolute bottom-8 left-0 z-20 flex w-full justify-center"
    >
      <LocationsAutocomplete
        @update:location="handleLocationUpdate"
        class="absolute bottom-0"
      />
    </div>
    <div
      class="relative z-20 flex w-full flex-col items-center justify-between"
    >
      <div>
        <h1 class="text-center lg:w-[28rem]">
          {{ pageData.homepage.heroHeadline.normal }}<br />
          <span class="font-script text-secondary text-7xl lg:text-9xl">{{
            pageData.homepage.heroHeadline.script
          }}</span>
        </h1>
        <p class="text-primary mt-2 text-center lg:text-white">
          {{ pageData.homepage.heroHeadline.subheader }}
        </p>
      </div>
    </div>
  </section>
  <section
    class="bg-primary px-row lg:px-row2x py-row text-white lg:max-w-[75%]"
  >
    <h4 class="smallcaps text-gray-light mb-4">Our Mission</h4>
    <h2 class="mb-6">
      {{ pageData.homepage.mission.header }} &mdash; no matter your budget.
    </h2>
    <p>
      Donec dui purus, semper vel est id, dignissim elementum turpis. Quisque
      nisi risus, dapibus in gravida in, lacinia non ligula. Mauris hendrerit
      nibh quis lobortis fermentum. Integer at nunc eu tortor dignissim
      convallis at eget ex. Curabitur suscipit est eu laoreet cursus. Donec
      accumsan congue eros.
    </p>
    <NuxtLink class="btn btn-secondary btn-full mt-8" to="/locations">
      Learn More About Us
    </NuxtLink>
  </section>
  <section class="bg-primary px-row lg:px-row2x py-row text-white">
    <h2 class="mb-12 lg:w-[55vw]">{{ pageData.homepage.mission.subheader }}</h2>
    <FeaturedHomes />
  </section>
  <section
    class="bg-primary px-row lg:px-row2x pb-row flex flex-col gap-[10vw] text-white lg:flex-row lg:gap-0"
  >
    <!-- Locations -->
    <div class="w-full lg:w-1/2 lg:pr-[2.5vw]">
      <div class="relative aspect-square lg:aspect-square">
        <Map :locations="locations" />
      </div>
      <h2 class="mb-4 mt-8 text-4xl lg:w-[55vw]">Find a Location Near You</h2>
      <p>
        With over 40 locations across the south, lorem ipsum dolor sit amet
        consectetur elit.
      </p>
      <NuxtLink class="btn btn-secondary btn-full mt-8" to="/locations">
        View All Locations
      </NuxtLink>
    </div>
    <!-- Homebuyer's Guide -->
    <div class="w-full lg:w-1/2 lg:pl-[2.5vw]">
      <div
        class="flex h-full flex-col items-center rounded-sm bg-white bg-[length:100%] bg-bottom bg-no-repeat px-5 pb-[33vw] pt-20 shadow-lg lg:pb-0"
        :style="{
          backgroundImage: `url('${pageData.homepage.homebuyersGuide.background.sourceUrl}')`,
        }"
      >
        <h2 class="text-gray-dark mb-5 text-center uppercase tracking-wider">
          <span class="font-script text-accent text-4xl normal-case">The</span
          ><br />
          Home<br />
          Buyer's<br />
          Guide
        </h2>
        <p class="text-gray-dark mb-7 max-w-xs text-center">
          {{ pageData.homepage.homebuyersGuide.subheader }}
        </p>
        <NuxtLink href="/homebuyers-guide" class="btn btn-secondary"
          >Start Learning Now</NuxtLink
        >
      </div>
    </div>
  </section>
</template>
<script setup>
//Data Fetch
const { data: pageData } = await getHome();

const locations = ref([]);

definePageMeta({
  layout: "fixed-header",
});

await $fetch("/api/locations").then((res) => {
  locations.value = res;
});

async function handleLocationUpdate(location) {
  await navigateTo({
    path: "/locations",
    query: {
      place_id: location.place_id,
    },
  });
}
</script>
