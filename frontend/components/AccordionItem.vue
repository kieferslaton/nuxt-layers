<template>
    <div class="py-5 accordion-item">
        <div class="flex justify-between">
            <div class="flex items-center">
                <img :src="`/images/accordion-icons/${item.icon}.svg`" class="mr-3" />
                <span class="text-gray-dark">{{ item.name }}</span>
            </div>
            <div class="h-5 w-5 flex justify-center items-center rounded-full bg-secondary">
                <Icon :name="isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" size="sm" color="white" />
            </div>
        </div>
        <div v-if="isOpen" v-html="item.html" class="accordion-item-content"></div>
    </div>
</template>
<script setup>
const props = defineProps({
    isOpen: Boolean,
    item: Object
})
</script>