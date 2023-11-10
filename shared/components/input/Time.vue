<template>
  <div :class="[classes, 'text-input-container', { error: errors?.length }]">
    <select :id="id" required v-model="localValue" @change="onChange">
      <option value="" disabled selected hidden>- Select a Time -</option>
      <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
    </select>
    <label :for="id">{{ label }}</label>
    <div
      class="pointer-events-none absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-secondary">
      <Icon name="access_time" color="white" size="16" />
    </div>
    <small class="mt-1 block w-full text-center text-error" v-if="errors?.length">{{ errors[0]?.$message }}.</small>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: String,
  label: String,
  modelValue: String,
  classes: String,
  errors: Array,
});
const emits = defineEmits(["update:modelValue"]);

let localValue = ref(props.modelValue)

watchEffect(() => {
  localValue.value = props.modelValue
})

const onChange = () => {
  emits('update:modelValue', localValue.value)
}

const hours = computed(() => {
  const options = [];
  for (let i = 8; i <= 18; i++) {
    const hour = i <= 12 ? `${i} AM` : `${i - 12} PM`;
    options.push(hour);
  }
  return options;
});
</script>

<style scoped lang="scss">
.text-input-container {
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
