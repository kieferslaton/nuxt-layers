<template>
  <section
    class="relative flex aspect-square items-center justify-center border-b border-b-primary-lighter bg-cover"
    style="background-image: url('/images/faq-hero.png')"
  >
    <h1>FAQs</h1>
    <Breadcrumb title="FAQs" classes="absolute bottom-0 left-4" />
  </section>
  <section>
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
      headerClasses="px-row text-white font-bold whitespace-wrap"
      contentClasses="px-row text-white"
    />
  </section>
</template>
<script setup>
const faqs = await getFaqs();
console.log(
  faqs.map((faq) => {
    return {
      title: faq.question,
      content: faq.answer,
    };
  })
);
</script>
