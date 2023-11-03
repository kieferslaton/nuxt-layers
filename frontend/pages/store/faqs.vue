<template>
  <section
    class="relative flex aspect-square items-center justify-center border-b border-b-primary-lighter bg-cover bg-no-repeat tl:aspect-auto tl:h-[75vh] tl:bg-[center_top_-18vw]"
    style="background-image: url('/images/faq-hero.png')"
  >
    <h1>FAQs</h1>
    <Breadcrumb title="FAQs" classes="absolute bottom-0 left-4" />
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
const faqs = await getFaqs();
</script>
