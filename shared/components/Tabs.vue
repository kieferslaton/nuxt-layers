<template>
    <div>
        <div class="flex mb-16 border-b border-gray-lighter">
            <Tab v-for="(item, index) in items" :key="item.name" :item="item" @click="setOpenItem(index)"
                :isActive="index === openItem" />
        </div>
        <div v-html="items[openItem].html" class="tab-item-content"></div>
    </div>
</template>
  
<script setup>
const openItem = ref(0)
const setOpenItem = (index) => openItem.value = index
const props = defineProps({
    items: Array
})
</script>
  