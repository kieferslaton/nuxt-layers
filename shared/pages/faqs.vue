<template>
  <section
    class="relative flex aspect-square items-center justify-center border-b border-b-primary-lighter bg-cover bg-no-repeat after:absolute after:left-0 after:top-0 after:z-0 after:h-full after:w-full after:bg-gradient-to-b after:from-transparent after:from-70% after:to-primary after:content-[''] tl:aspect-auto tl:h-[75vh] tl:bg-[center_top_-18vw] lg:border-none"
    style="background-image: url('/images/faq-hero.png')"
  >
    <h1 class="text-white">FAQs</h1>
    <Breadcrumb title="FAQs" classes="absolute bottom-0 left-4 z-10" />
  </section>
  <section class="tl:mx-auto tl:max-w-[800px]">
    <Accordion
      :items="
        faqs.map((faq) => {
          return {
            header: faq.question,
            content: faq.answer,
          };
        })
      "
      :initialOpen="false"
      classes="text-white"
      itemClasses="border-b-primary-lighter py-8"
      headerClasses="px-row tl:px-0 text-white font-bold whitespace-wrap"
      contentClasses="px-row tl:px-0 text-white"
    />
  </section>
</template>

<script setup>
definePageMeta({
  layout: "fixed-header",
});
const faqs = await getFaqs();
</script>
