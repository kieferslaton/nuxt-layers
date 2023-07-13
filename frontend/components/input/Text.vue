<template>
    <div class="text-input-container" :class="class">
        <label :for="id" :class="longLabel && 'long-label'">{{ label }}</label>
        <span v-if="prepend" class="prepend">{{ prepend }}</span>
        <input type="text" :id="id" required :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>
<script setup>
const props = defineProps({
    id: String,
    label: String,
    modelValue: String,
    class: String,
    longLabel: Boolean,
})
const emits = defineEmits(['update:modelValue'])

</script>
<style scoped lang="scss">
.text-input-container {
    position: relative;
    width: 100%;

    &:focus-within {
        label:not(.long-label) {
            color: #3DBDFF;
        }
    }

    input {
        border: 1px solid #DDDDDD;
        width: 100%;
        padding: 1rem 1.5rem;
        border-radius: 9999px;
        color: #333;

        &:focus {
            outline: 1px solid #3DBDFF;
        }
    }

    label:not(.long-label) {
        position: absolute;
        font-size: 10px;
        padding: 0 0.5rem;
        color: #333;
        background-color: white;
        left: 1.5rem;
        transform: translateY(-50%);
    }

    .long-label {
        display: block;
        margin: 0 auto;
        text-align: center;
        color: #333;
        font-weight: bold;
        margin-bottom: 1.5rem;
    }
}
</style>