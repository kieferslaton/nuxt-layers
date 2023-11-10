<template>
  <section
    v-if="pageData"
    class="text-primary-dark px-row relative flex h-screen min-h-[600px] w-full items-start bg-[length:auto_130%] bg-[center_bottom_110%] bg-no-repeat pt-36 lg:items-center lg:bg-cover lg:bg-center lg:pt-0"
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
      <NuxtLink class="btn btn-secondary btn-full" to="/find-a-home">
        Search For A Home
      </NuxtLink>
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
  <section class="bg-primary px-row lg:px-row2x pb-20 pt-16 text-white">
    <h4 class="smallcaps text-gray-light mb-4">Our Mission</h4>
    <h2 class="mb-6 lg:w-[55vw]">
      {{ pageData.homepage.mission.header }}
    </h2>
    <h5 class="mb-16">{{ pageData.homepage.mission.subheader }}</h5>
    <FeaturedHomes />
  </section>
  <div
    class="bg-primary lg:px-row2x flex flex-col lg:flex-row lg:items-stretch lg:gap-[5vw]"
  >
    <!-- Homebuyer's Guide -->
    <section class="homebuyers-guide">
      <div class="container mx-auto" data-reveal>
        <div
          class="flex flex-col items-center bg-white bg-[length:100%] bg-bottom bg-no-repeat px-5 pb-[33vw] pt-20 lg:w-[45vw] lg:pb-[360px]"
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

    <!-- TODO: Need Deals -->
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
//Data Fetch
definePageMeta({
  layout: "fixed-header",
});
const { data: pageData } = await getHome();
</script>
