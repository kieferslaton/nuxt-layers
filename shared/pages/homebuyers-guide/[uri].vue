<template>
  <h1 class="mb-10 text-center font-display-serif text-2xl uppercase tracking-wider text-gray-dark">
    <span class="mr-2 font-script text-2xl normal-case text-accent">The</span>
    Home Buyers Guide
  </h1>
  <div class="mb-16 border-b border-b-gray-lighter px-row text-gray-dark">
    <ol class="mx-auto flex w-full justify-between lg:max-w-2xl">
      <li class="px-2 pb-3 text-[0.85rem]" :class="title === 'Buying' ? 'border-b-2 border-secondary' : ''">
        <a href="/homebuyers-guide/buying">
          <span class="mr-2 font-bold" :class="title === 'Buying' ? 'text-secondary' : ''">1</span>Buying
        </a>
      </li>
      <li class="px-2 pb-3 text-[0.85rem]" :class="title === 'Construction' ? 'border-b-2 border-secondary' : ''">
        <a href="/homebuyers-guide/construction">
          <span class="mr-2 font-bold" :class="title === 'Construction' ? 'text-secondary' : ''">2</span>Construction
        </a>
      </li>
      <li class="px-2 pb-3 text-[0.85rem]" :class="title === 'After-Purchase' ? 'border-b-2 border-secondary' : ''">
        <a href="/homebuyers-guide/after-purchase">
          <span class="mr-2 font-bold" :class="title === 'After-Purchase' ? 'text-secondary' : ''">3</span>After-Purchase
        </a>
      </li>
    </ol>
  </div>
  <section class="flex flex-col items-center">
    <h2 class="mb-4 font-serif text-4xl">The {{ title }} Process</h2>
    <img src="/images/homebuyers-hero.png" class="mb-8" width="648" />
    <div class="content mb-12 px-row lg:max-w-[800px] lg:px-0" v-html="content" />
    <Accordion :items="steps" :initialOpen="false" :hasSteps="title === 'Buying'" headerClasses="px-row tl:px-0 py-5"
      contentClasses="px-row tl:px-0" classes="mb-12 tl:mx-auto tl:max-w-[800px]" />
    <div class="mb-24 flex flex-col justify-between gap-8 lg:w-[800px] lg:flex-row-reverse">
      <a :href="`/homebuyers-guide/${title === 'Buying' ? 'construction' : 'after-purchase'
        }`" class="btn btn-secondary btn-full self-start" v-if="title === 'Buying' || title === 'Construction'">
        Next: {{ title === "Buying" ? "Construction" : "After-Purchase" }}</a>
      <a href="/homebuyers-guide" class="btn-gray-light-transparent btn flex items-center justify-start self-start pl-2">
        <Icon name="chevron_left" color="secondary" size="16" class="mr-4" /><span>Back to Home Buyer's Guide</span>
      </a>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'light'
})

const route = useRoute();
const { title, content, steps } = await getHomebuyersContent(route.params.uri);
</script>
