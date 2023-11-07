<template>
    <div @click="$emit('click')" class="py-5 px-5 cursor-pointer tab-item"
        :class="{ 'border-b border-secondary': isActive }">
        <div class="flex items-center">
            <img :src="`/images/accordion-icons/${item.icon}.svg`" class="mr-3" />
            <span class="text-gray-dark">{{ item.name }}</span>
        </div>
    </div>
</template>
  
<script setup>
const props = defineProps({
    isActive: Boolean,
    item: Object
})
</script>
  