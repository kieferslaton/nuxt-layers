<template>
  <div :class="[classes, 'w-full']">
    <AccordionItem
      @click="index === openItem ? setOpenItem(null) : setOpenItem(index)"
      v-for="(item, index) in items"
      :key="item.name"
      :item="item"
      :isOpen="index === openItem"
      :step="hasSteps ? index + 1 : null"
      :itemClasses="itemClasses"
      :headerClasses="headerClasses"
      :contentClasses="contentClasses"
    />
  </div>
</template>
<script setup>
const setOpenItem = (index) => (openItem.value = index);
const props = defineProps({
  items: Array,
  initialOpen: {
    type: Boolean,
    default: true,
  },
  hasSteps: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: String,
    default: "",
  },
  itemClasses: {
    type: String,
    default: "",
  },
  headerClasses: {
    type: String,
    default: "",
  },
  contentClasses: {
    type: String,
    default: "",
  },
});

const openItem = ref(props.initialOpen ? 0 : -1);
</script>
