<template>
  <div :class="[classes, 'text-input-container', { error: errors?.length }]">
    <input
      type="date"
      :id="id"
      required
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label :for="id">{{ label }}</label>
    <div
      class="pointer-events-none absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-secondary"
    >
      <Icon name="date_range" color="white" size="16" />
    </div>
    <small
      class="mt-1 block w-full text-center text-error"
      v-if="errors?.length"
      >{{ errors[0]?.$message }}.</small
    >
  </div>
</template>
<script setup>
const props = defineProps({
  id: String,
  label: String,
  modelValue: String,
  classes: String,
  errors: Array,
});
const emits = defineEmits(["update:modelValue"]);
</script>
<style scoped lang="scss">
.text-input-container {
  position: relative;
  width: 100%;

  input {
    border: 1px solid #dddddd;
    width: 100%;
    padding: 1rem 1.5rem;
    border-radius: 9999px;
    color: #333;

    &::-webkit-calendar-picker-indicator {
      color: transparent;
      background: transparent;
    }

    &:focus {
      outline: 1px solid #3dbdff;

      & + label {
        color: #3dbdff;
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
