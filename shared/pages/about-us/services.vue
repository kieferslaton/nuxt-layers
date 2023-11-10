<template>
  <section
    class="relative flex h-[70vh] items-center justify-center border-b border-b-primary-lighter bg-cover bg-bottom bg-no-repeat"
    style="background-image: url('/images/services-hero.png')">
    <h1 class="text-white">Services</h1>
    <Breadcrumb classes="absolute bottom-0 left-4" />
  </section>
  <section class="px-row py-8">
    <div v-for="service in services" :key="service.title" class="mb-8">
      <div class="mb-4 flex items-center">
        <Icon :name="service.servicesFields.icon.toLowerCase().replace(' ', '_')" color="secondary" size="20" filled
          class="mr-4" />
        <h4 class="font-bold">{{ service.title }}</h4>
      </div>
      <p class="ml-10">{{ service.servicesFields.description }}</p>
    </div>
  </section>
</template>
<script setup>
definePageMeta({
  layout: 'fixed-header',
})
const services = await getServices();
</script>
