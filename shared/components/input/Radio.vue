<template>
    <div class="flex flex-col w-full" :class="class">
        <span class="text-gray-dark text-base font-bold mb-8 self-center">{{ label }}</span>
        <div :class="{ 'flex flex-row items-center justify-center': options.length === 2, 'flex flex-col': options.length > 2 }"
            class="w-full">
            <label v-for="(item, index) in options" :key="item.value" class="flex items-center"
                :class="{ 'px-8 border-r border-gray-lighter': options.length === 2 && index === 0, 'px-8': options.length === 2, 'mb-4': options.length > 2 && index < options.length - 1 }">
                <div>
                    <input type="radio" :value="item.value" class="opacity-0 absolute" v-model="localValue"
                        @change="onChange" />
                    <div v-if="localValue === item.value" class="border border-secondary rounded-full h-6 w-6 p-[10%]">
                        <div class="bg-secondary rounded-full w-full h-full"></div>
                    </div>
                    <div v-else class="border border-gray-dark rounded-full h-6 w-6 flex items-center justify-center"></div>
                </div>
                <span class="text-gray-dark ml-4">{{ item.label }}</span>
            </label>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    label: String,
    options: Array,
    modelValue: String,
    class: String
})

const emits = defineEmits(['update:modelValue'])

let localValue = ref(props.modelValue);

watchEffect(() => {
    localValue.value = props.modelValue;
})

const onChange = () => {
    emits('update:modelValue', localValue.value);
}
</script>
