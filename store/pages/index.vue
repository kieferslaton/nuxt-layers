<template>
  <section
    v-if="pageData"
    class="to-primary px-row flex h-screen w-full flex-col items-center justify-between bg-gradient-to-b from-transparent from-90% bg-[length:400vw] pb-4 pt-36 lg:justify-start lg:bg-cover lg:pt-60"
    style="background-position: 35% 0"
    :style="{
      backgroundImage: `url('${pageData.featuredImage.node.sourceUrl}')`,
    }"
  >
    <div class="relative z-20">
      <h1 class="text-center lg:w-[28rem]">
        {{ pageData.homepage.heroHeadline.normal }}<br />
        <span class="font-script text-secondary text-7xl lg:text-9xl">{{
          pageData.homepage.heroHeadline.script
        }}</span>
      </h1>
      <p>{{ pageData.homepage.heroHeadline.subheader }}</p>
    </div>
    <NuxtLink class="btn btn-secondary btn-full" to="/find-a-home">
      Search For A Home
    </NuxtLink>
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
    <section
      class="flex flex-col items-center bg-[length:250%] bg-bottom bg-no-repeat px-16 pb-96 pt-20 lg:h-[50vw] lg:w-[45vw] lg:bg-cover"
      :style="{
        backgroundImage: `url('${pageData.homepage.homebuyersGuide.background.sourceUrl}')`,
      }"
    >
      <h2
        class="text-gray-dark mb-5 text-center uppercase tracking-wider lg:w-60"
      >
        <span class="font-script text-accent text-4xl normal-case">The</span
        ><br />
        Home Buyer's Guide
      </h2>
      <p class="mb-7 text-center lg:w-80">
        {{ pageData.homepage.homebuyersGuide.subheader }}
      </p>
      <NuxtLink href="/homebuyers-guide" class="btn btn-secondary"
        >Start Learning Now</NuxtLink
      >
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
const { data: pageData } = await getHome();
</script>
