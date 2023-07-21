<template>
  <span :class="[classes, 'mb-4 flex items-center lg:hidden']">
    <Icon name="home" color="white" size="12" filled class="mr-2" />
    <span
      v-if="parentTitle"
      class="mr-3 h-[3px] w-[3px] -rotate-45 border-b border-r border-gray-lighter"
    ></span>
    <span
      v-if="parentTitle"
      class="smallcaps mr-2 font-display text-[0.65rem] font-bold tracking-[0.25rem] text-gray-lighter"
      >{{ parentTitle }}</span
    >
    <span
      class="mr-3 h-[3px] w-[3px] -rotate-45 border-b border-r border-gray-lighter"
    ></span>
    <span
      class="smallcaps font-display text-[0.65rem] font-light tracking-[0.25rem] text-gray-lighter"
      >{{ title }}</span
    >
  </span>
</template>
<script setup>
const title = ref("");
const parentTitle = ref(null);
const route = useRoute();
const pathArr = route.path.split("/").splice(1);
if (pathArr.length > 1) {
  title.value = pathArr[pathArr.length - 1];
  parentTitle.value = pathArr[pathArr.length - 2];
} else {
  title.value = pathArr[0];
}
console.log(pathArr);
const props = defineProps({
  classes: {
    type: String,
    default: "",
  },
});
</script>
