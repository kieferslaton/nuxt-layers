<template>
    <AccordionItem @click="setOpenItem(index)" v-for="(item, index) in items" :key="item.name" :item="item"
        :isOpen="index === openItem" />
</template>
<script setup>
const openItem = ref(0);
const setOpenItem = (index) => openItem.value = index;
const props = defineProps({
    items: Array
})
</script>