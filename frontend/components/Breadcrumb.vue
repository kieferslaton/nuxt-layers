<template>
    <span class="flex items-center mb-4 lg:hidden">
        <Icon name="home" color="white" size="12" filled class="mr-2" />
        <span class="h-[3px] w-[3px] border-r border-b border-gray-lighter mr-3 -rotate-45"></span>
        <span class="smallcaps text-gray-lighter text-[0.65rem] font-display font-light tracking-[0.25rem]">{{ title
        }}</span>
    </span>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>
