<template>
    <div class="flex items-start" :class="class">
        <div>
            <input type="checkbox" :id="label" class="opacity-0 absolute" v-model="localValue" @change="onChange" />
            <div v-if="localValue" class="bg-secondary rounded-sm h-5 w-5 flex items-center justify-center">
                <Icon name="check" size="16" color="white" />
            </div>
            <div v-else class="border border-gray-dark rounded-sm h-5 w-5 flex items-center justify-center"></div>
        </div>
        <label :for="label" class="text-gray-dark ml-6">{{ label }}</label>
    </div>
</template>

<script setup>
const props = defineProps({
    label: String,
    modelValue: Boolean,
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
