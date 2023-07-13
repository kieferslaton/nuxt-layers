<template>
    <div class="text-input-container" :class="class">
        <label :for="id" :class="longLabel && 'long-label'">{{ label }}</label>
        <div class="relative">
            <span class="prepend">$</span>
            <input type="text" v-model="displayValue" @input="onInput" />
        </div>
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

const rawValue = ref(props.modelValue)

// format the value as a dollar amount
const displayValue = computed({
    get: () => rawValue.value === '0' ? '' : Number(rawValue.value).toLocaleString('en-US'),
    set: (val) => {
        rawValue.value = val.replace(/[^\d]/g, '')
        emits('update:modelValue', rawValue.value)
    }
})

// Update the model value on input
const onInput = (event) => {
    rawValue.value = event.target.value.replace(/[^\d]/g, '')
    emits('update:modelValue', rawValue.value)
}

</script>
<style scoped lang="scss">
.text-input-container {
    position: relative;
    width: 100%;

    input {
        border: 1px solid #DDDDDD;
        width: 100%;
        padding: 1rem 2.5rem 0.95rem;
        border-radius: 9999px;
        color: #333;

        &:focus {
            outline: 1px solid #3DBDFF;

            &+label:not(.long-label) {
                color: #3DBDFF;
            }
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

    .prepend {
        color: #333;
        position: absolute;
        left: 1.5rem;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>