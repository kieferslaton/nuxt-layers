<template>
  <section
    class="after:z-1 relative flex aspect-square items-center justify-center border-b border-b-primary-lighter bg-cover bg-no-repeat after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-gradient-to-b after:from-transparent after:from-70% after:to-primary after:content-[''] tl:aspect-auto tl:h-[75vh] tl:bg-[center_top_-18vw] lg:border-none"
    style="background-image: url('/images/faq-hero.png')"
  >
    <h1 class="text-white">{{ title }}</h1>
    <Breadcrumb title="FAQs" classes="absolute bottom-0 left-4 z-10" />
  </section>
  <section class="bg-primary px-row pt-10 lg:px-row2x">
    <div
      v-html="content"
      class="prose max-w-full rounded bg-white px-row py-row"
    ></div>
  </section>
</template>

<script setup>
const route = useRoute();

definePageMeta({
  layout: "fixed-header",
});

const { title, content } = await getPage(route.params.uri);
</script>
