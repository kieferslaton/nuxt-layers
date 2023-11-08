<template>
  <!-- Hero -->
  <section
    class="px-row after-left-0 after:to-primary after:z-1 relative flex items-center justify-center bg-cover bg-bottom bg-no-repeat after:absolute after:top-0 after:h-full after:w-full after:bg-gradient-to-b after:from-transparent after:from-70% after:content-['']"
    :style="{
      backgroundImage: `url(${pageData.hero.backgroundImage.sourceUrl})`,
    }"
  >
    <div
      class="container mx-auto pt-[40vw] text-center sm:pt-[30vw] lg:pt-[20vw]"
    >
      <h1
        class="mx-auto max-w-lg text-5xl leading-[1.2] text-white sm:text-6xl lg:max-w-2xl"
        data-reveal
      >
        {{ pageData.hero.headline }}
      </h1>
      <div class="relative z-10 mx-auto mt-16 aspect-video" data-reveal>
        <iframe
          width="560"
          height="315"
          class="absolute left-0 h-full w-full"
          :src="`https://www.youtube.com/embed/${pageData.hero.videoId}?si=2_YeS9emgXQzf1Xv`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
  <!-- Form -->
  <section class="form px-row pt-row">
    <div class="container mx-auto">
      <h2 class="mb-8 text-center font-sans text-lg lg:text-xl" data-reveal>
        {{ pageData.hero.subHeading }}
      </h2>
      <ContactForm data-reveal />
    </div>
  </section>
  <!-- Home Stats-->
  <section class="home-stats px-row py-row2x">
    <div
      class="container mx-auto flex flex-col items-center gap-16 text-center lg:flex-row lg:items-start lg:gap-24"
    >
      <div v-for="stat in pageData.homeStats" class="lg:w-1/3" data-reveal>
        <h2
          class="flex max-w-lg flex-col items-center text-4xl uppercase leading-[1.2] text-[#E1C16E] sm:text-5xl lg:max-w-xl"
        >
          <span class="stat__number">{{ stat.stat.statNumber }}</span>
          <span>{{ stat.stat.statHeading }}</span>
        </h2>
        <p>{{ stat.stat.statDescription }}</p>
      </div>
    </div>
  </section>
  <!-- Homebuyer's Guide -->
  <section class="homebuyers-guide">
    <div class="container mx-auto" data-reveal>
      <div
        class="flex flex-col items-center bg-white bg-[length:100%] bg-bottom bg-no-repeat px-5 pb-[33vw] pt-20 lg:pb-[360px]"
        :style="{
          backgroundImage: `url('${pageData.homebuyersGuideCopy.background.sourceUrl}')`,
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
          {{ pageData.homebuyersGuideCopy.subheader }}
        </p>
        <NuxtLink href="/homebuyers-guide" class="btn btn-secondary"
          >Start Learning Now</NuxtLink
        >
      </div>
    </div>
  </section>
  <!-- Why Regional? -->
  <section class="px-row py-row">
    <div class="container mx-auto">
      <span
        class="text-gray-light text-xs uppercase tracking-[0.35em]"
        data-reveal
        >Why Regional?</span
      >
      <h2
        class="mb-12 mt-4 max-w-4xl text-5xl leading-[1.2] sm:text-6xl"
        data-reveal
      >
        {{ pageData.whyRegional.headline }}
      </h2>
      <div
        v-for="bullet in pageData.whyRegional.bullets"
        class="mt-8"
        data-reveal
      >
        <div class="mb-4 flex items-start">
          <Icon
            :name="bullet.icon.toLowerCase().replace(' ', '_')"
            color="secondary"
            size="20"
            filled
            class="mr-4"
          />
          <div>
            <h4 class="font-bold">{{ bullet.title }}</h4>
            <p>{{ bullet.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom Layout
definePageMeta({
  layout: "marketing",
});

// Get page data
const { data: pageData } = await getMarketingPage();

onMounted(async () => {
  // Scroll animations
  let sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    let reveal = section.querySelectorAll("[data-reveal]");

    gsap.fromTo(
      reveal,
      {
        y: 120,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top center",
        },
      }
    );
  });

  let stats = document.querySelectorAll(".stat__number");
  stats.forEach((stat) => {
    gsap.from(stat, {
      textContent: 0,
      duration: 1.5,
      ease: "power3.out",
      snap: { textContent: 1 },
      stagger: {
        each: 1,
        onUpdate: function () {
          this.targets()[0].innerHTML = numberWithCommas(
            Math.ceil(this.targets()[0].textContent)
          );
        },
      },
      scrollTrigger: {
        trigger: stat,
        start: "top 85%",
      },
    });
  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
});
</script>
