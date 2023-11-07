<template>
    <div :class="class" class="flex flex-col w-full">
        <label :for="id" class="text-center text-gray-dark font-bold mb-6">{{ label }}</label>
        <span class="text-center text-gray-dark text-base mb-10">{{ modelValue }}</span>
        <input min="500" max="700" step="10"
            class="appearance-none h-1 bg-gray-lighter mx-row [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:bg-secondary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:bg-secondary [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:ease-in-out"
            type="range" :id="id" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
        <div class="flex justify-between text-gray-dark text-xs mx-row mt-4">
            <span>500 (or less)</span>
            <span>700 (or more)</span>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    id: String,
    label: String,
    modelValue: String,
    class: String
})
</script>
