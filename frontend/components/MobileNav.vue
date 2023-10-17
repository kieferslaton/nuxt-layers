<template>
  <nav
    class="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col justify-between bg-white"
  >
    <div class="flex items-center justify-between p-row">
      <a
        class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
        href="/"
      >
        <Icon name="phone" color="white" size="18" filled />
      </a>
      <button
        @click.prevent="$emit('close')"
        class="flex h-14 w-14 items-center justify-center"
      >
        <Icon name="close" color="gray-dark" size="xl" />
      </button>
    </div>
    <div class="">
      <ul class="mb-16 border-t border-gray-lighter">
        <li v-for="item in menuItems">
          <NuxtLink
            class="flex items-stretch justify-between border-b border-gray-lighter pl-row text-gray-dark"
            :href="item.node.uri"
          >
            <span class="my-5 font-serif text-4xl">{{ item.node.label }}</span>
            <div
              v-if="item.node.childItems?.edges?.length"
              class="flex aspect-square h-full items-center justify-center"
            >
              +
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="mb-10 flex items-center justify-center">
      <a
        href="#"
        class="flex items-center justify-center border-r border-gray-light px-10 text-gray-dark"
      >
        <Icon name="favorite_border" color="grayDark" size="18" filled />
        <span class="ml-2">My Favorites</span>
      </a>
      <a href="#" class="flex items-center justify-center px-10 text-gray-dark">
        <Icon name="person_outline" color="grayDark" size="18" filled />
        <span class="ml-2">My Account</span>
      </a>
    </div>
  </nav>
</template>
<script setup>
const props = defineProps({
  menuItems: Array,
});
const emits = defineEmits(["close"]);
</script>
