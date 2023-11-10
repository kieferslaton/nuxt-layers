<template>
    <div class="select-input-container" :class="class">
        <label :for="id" class="long-label">{{ label }}</label>
        <select :id="id" required v-model="localValue" @change="onChange">
            <option value="" disabled selected hidden class="placeholder">- Select an Option -</option>
            <option v-for="(item, index) in options" :key="index" :value="item.value">{{ item.label }}</option>
        </select>
    </div>
</template>
<script setup>
const props = defineProps({
    id: String,
    label: String,
    modelValue: String,
    class: String,
    options: Array,
    placeholder: String,
})

const emits = defineEmits(['update:modelValue'])

let localValue = ref(props.modelValue)

watchEffect(() => {
    localValue.value = props.modelValue
})

const onChange = () => {
    emits('update:modelValue', localValue.value)
}

</script>
<style scoped lang="scss">
.select-input-container {
    position: relative;
    width: 100%;

    select {
        border: 1px solid #DDDDDD;
        width: 100%;
        padding: 1rem 1.5rem;
        border-radius: 9999px;
        color: #333;
        background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='10' fill='%23212121' viewBox='0 0 40 40'><path d='M20 25l10-15h-20l10 15z'/></svg>") no-repeat 95% 55%, #FFFFFF;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;

        &::-ms-expand {
            display: none;
        }

        &:focus {
            outline: 1px solid #3DBDFF;
        }

        .placeholder {
            color: #D3D3D3;
            /* replace with your lighter gray color */
        }
    }

    .long-label {
        display: block;
        margin: 0 auto;
        text-align: center;
        color: #333;
        font-weight: bold;
        margin-bottom: 2rem;
    }
}
</style>
