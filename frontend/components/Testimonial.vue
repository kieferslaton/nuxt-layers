<template>
  <section
    class="border-b border-t border-primary-light bg-primary px-row pb-20 pt-28 text-white lg:border-none lg:px-row2x"
  >
    <div
      class="flex flex-col items-center lg:mt-[200px] lg:border lg:border-primary-light"
    >
      <div
        class="relative mb-10 flex w-full flex-col items-center lg:-mt-[200px] lg:w-auto lg:bg-primary lg:px-10"
      >
        <img
          src="/images/testimonial-mask.png"
          class="w-[275px] lg:w-[480px]"
        />
        <h3
          class="absolute bottom-0 font-script text-7xl font-normal"
          style="line-height: 0.3"
        >
          Testimonials
        </h3>
      </div>
      <blockquote class="mb-6 max-w-[580px] lg:text-center">
        "{{ stripContentTags(testimonial.content) }}"
      </blockquote>
      <div class="mb-10 flex flex-col items-center">
        <div
          class="mb-3 h-10 w-10 rounded-full bg-cover bg-center lg:h-20 lg:w-20"
          :style="{
            backgroundImage: `url('${testimonial.featuredImage.node.sourceUrl}')`,
          }"
        ></div>
        <span class="mb-3">{{ testimonial.title }}</span>
        <div class="flex gap-2">
          <Icon
            v-for="n in 5"
            :key="n"
            name="star"
            size="sm"
            color="white"
            filled
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const { data: testimonial } = await getTestimonial();
</script>
