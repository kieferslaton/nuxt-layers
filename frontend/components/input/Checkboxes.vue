<template>
    <div class="flex w-full" :class="class">
        <div class="flex flex-col">
            <span class="text-gray-dark text-base font-bold mb-2">{{ label }}</span>
            <small class="text-gray-dark">(Check All That Apply)</small>
        </div>
        <div class="ml-12">
            <label v-for="item in options" :key="item.value" class="flex items-center justify-start mb-4">
                <div>
                    <input type="checkbox" :value="item.value" class="opacity-0 absolute" v-model="localValue"
                        @change="onChange" />
                    <div v-if="localValue.includes(item.value)"
                        class="bg-secondary rounded-sm h-6 w-6 flex items-center justify-center">
                        <Icon name="check" size="md" color="white" />
                    </div>
                    <div v-else class="border border-gray-dark rounded-sm h-6 w-6 flex items-center justify-center"></div>
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
    modelValue: Array,
    class: String
})

const emits = defineEmits(['update:modelValue'])

let localValue = ref([...props.modelValue]);

watchEffect(() => {
    localValue.value = [...props.modelValue];
})

const onChange = () => {
    emits('update:modelValue', localValue.value);
}

</script>
