<template>
  <nav
    class="fixed left-0 top-0 flex h-screen w-screen flex-col justify-between bg-white"
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
        <Icon name="close" color="grayDark" size="xl" />
      </button>
    </div>
    <div class="px-row">
      <h3 class="mb-8 text-base font-normal text-gray-dark">Menu</h3>
      <ul class="mb-16">
        <li
          v-for="item in [
            'About Us',
            'Find A Home',
            'Prequalify',
            'FAQs',
            'Contact',
          ]"
        >
          <a
            class="flex items-center justify-between border-b border-gray-lighter py-5 pr-4 text-gray-dark"
            href="#"
          >
            <span class="font-serif text-4xl">{{ item }}</span>
            <Icon name="arrow_forward" color="secondary" size="24 " filled />
          </a>
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
const emits = defineEmits(["close"]);
</script>
