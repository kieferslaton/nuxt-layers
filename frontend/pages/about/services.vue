<template>
  <section
    class="relative flex aspect-square items-center justify-center border-b border-b-primary-lighter bg-cover"
    style="background-image: url('/images/faq-hero.png')"
  >
    <h1>Services</h1>
    <Breadcrumb classes="absolute bottom-0 left-4" />
  </section>
  <section class="px-row py-8">
    <div v-for="service in services" :key="service.title" class="mb-8">
      <div class="mb-4 flex items-center">
        <Icon
          :name="service.icon"
          color="secondary"
          size="20"
          filled
          class="mr-4"
        />
        <h4 class="font-bold">{{ service.title }}</h4>
      </div>
      <p class="ml-10">{{ service.description }}</p>
    </div>
  </section>
</template>
<script setup>
const services = await getServices();
console.log(services);
</script>
