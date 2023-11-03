<template>
    <div>
        <section
            class="relative flex aspect-square items-center justify-center border-b border-b-primary-lighter bg-cover bg-no-repeat tl:aspect-auto tl:h-[75vh] tl:bg-[center_top_-18vw]"
            style="background-image: url('/images/faq-hero.png')">
            <h1 class="text-white">{{ title }}</h1>
            <Breadcrumb title="FAQs" classes="absolute bottom-0 left-4" />
        </section>
        <section class="bg-primary px-row py-10 d:px-row2x">
            <div v-html="content" class="prose prose-headings:mb-4 rounded bg-white px-row py-row2x tl:py-row"></div>
            <div class="prose rounded bg-white px-row py-row2x tl:py-row mt-row">
                <h2>Our Manufacturers</h2>
                <p class="mb-10">Regional Homes is proud to work with some of the best manufacturers in the southeastern
                    region.</p>
                <div class="mb-10" v-for="manufacturer in manufacturers" :key="manufacturer.id">
                    <img class="mb-4" :src="manufacturer.featuredImage.node.sourceUrl" />
                    <h3 class="mb-4">{{ manufacturer.title }}</h3>
                    <div v-html="manufacturer.content">
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
  
<script setup>
const route = useRoute();
const { title, content } = await getPage('about-us');
const manufacturers = await getManufacturers();

</script>