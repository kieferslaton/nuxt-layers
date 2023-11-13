<template>
  <nav class="flex grow justify-end xl:justify-center">
    <ul class="flex items-center gap-12 dl:gap-16">
      <li class="relative py-5" :class="item.toLowerCase().replaceAll(' ', '-') === currentItem
          ? 'after:absolute after:-bottom-0 after:block after:h-[2px] after:w-full after:bg-[#3DBDFF]'
          : ''
        ">
        <nuxt-link class="smallcaps font-medium" :to="'/' + item.toLowerCase().replaceAll(' ', '-')">
          {{ item }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>
<script setup>
const props = defineProps({
  currentItem: String,
});
//console.log(props.currentItem);
</script>
