<template>
  <nav class="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col justify-between bg-white">
    <div class="flex items-center justify-between p-row">
      <a class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary" href="/">
        <Icon name="phone" color="white" size="18" filled />
      </a>
      <button @click.prevent="$emit('close')" class="flex h-14 w-14 items-center justify-center">
        <Icon name="close" color="gray-dark" size="xl" />
      </button>
    </div>
    <div class="">
      <ul class="mb-16 border-t border-gray-lighter">
        <li v-for="item in menuItems">
          <NuxtLink class="flex items-center justify-between h-24 border-b border-gray-lighter pl-row text-gray-dark"
            :href="item.node.uri" @click="() => {
              if (!item.node.childItems?.edges?.length) {
                $emit('close')
              }
            }">
            <span class="font-serif text-4xl">{{ item.node.label }}</span>
            <div @click.prevent="() => {
              item.showSubMenu = !item.showSubMenu;
              console.log(item.showSubMenu)
            }" v-if="item.node.childItems?.edges?.length"
              class="flex aspect-square h-full items-center justify-center border-l border-gray-lighter text-secondary text-4xl">
              {{ item.showSubMenu ? '-' : '+' }}
            </div>
          </NuxtLink>
          <NuxtLink @click="$emit('close')" :href="child.node.uri" v-if="item.showSubMenu"
            class="flex items-center h-24 pl-row bg-gray-lightest border-gray-lighter border-b"
            v-for="child in item.node.childItems?.edges">
            <span class="font-sans mr-2 text-gray-dark">{{ child.node.label }}</span>
            <Icon name="arrow_forward" color="secondary" size="12" filled />
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="mb-10 flex items-center justify-center">
      <a href="#" class="flex items-center justify-center border-r border-gray-light px-10 text-gray-dark">
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
const menuItems = ref(props.menuItems.map((item) => {
  return {
    ...item,
    showSubMenu: false,
  };
}));
</script>
