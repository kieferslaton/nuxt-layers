<template>
    <div class="text-input-container" :class="class">
        <input type="date" :id="id" required :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
        <label :for="id">{{ label }}</label>
        <div
            class="h-12 w-12 rounded-full bg-secondary flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon name="date_range" color="white" size="16" />
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
const emits = defineEmits(['update:modelValue'])
</script>
<style scoped lang="scss">
.text-input-container {
    position: relative;
    width: 100%;

    input {
        border: 1px solid #DDDDDD;
        width: 100%;
        padding: 1rem 1.5rem;
        border-radius: 9999px;
        color: #333;

        &::-webkit-calendar-picker-indicator {
            color: transparent;
            background: transparent;
        }

        &:focus {
            outline: 1px solid #3DBDFF;

            &+label {
                color: #3DBDFF;
            }
        }
    }

    label {
        position: absolute;
        font-size: 10px;
        padding: 0 0.5rem;
        color: #333;
        background-color: white;
        left: 1.5rem;
        transform: translateY(-50%);
    }
}
</style>