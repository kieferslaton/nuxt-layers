<template>
  <section
    class="relative flex aspect-square items-center justify-center border-b border-b-primary-lighter bg-cover bg-no-repeat tl:aspect-auto tl:h-[75vh] tl:bg-[center_top_-18vw]"
    style="background-image: url('/images/faq-hero.png')">
    <h1 class="text-white">{{ title }}</h1>
    <Breadcrumb title="FAQs" classes="absolute bottom-0 left-4" />
  </section>
  <section class="bg-primary px-row pt-10 d:px-row2x">
    <div v-html="content" class="prose rounded bg-white px-row py-row2x tl:py-row"></div>
  </section>
</template>

<script setup>
const route = useRoute();

definePageMeta({
  layout: 'fixed-header'
})

const { title, content } = await getPage(route.params.uri);
</script>
