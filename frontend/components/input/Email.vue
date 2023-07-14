<template>
  <div :class="[classes, 'text-input-container', { error: errors?.length }]">
    <label :for="id">{{ label }}</label>
    <input
      type="email"
      :id="id"
      required
      :value="modelValue"
      @blur="$emit('blur')"
      @input="$emit('update:modelValue', $event.target.value)"
    />
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
const emits = defineEmits(["update:modelValue", "blur"]);
</script>
<style scoped lang="scss">
.text-input-container {
  position: relative;
  width: 100%;

  &:focus-within {
    label:not(.long-label) {
      color: #3dbdff;
    }
  }

  input {
    border: 1px solid #dddddd;
    width: 100%;
    padding: 1rem 1.5rem;
    border-radius: 9999px;
    color: #333;

    &:focus {
      outline: 1px solid #3dbdff;
    }
  }

  &.error {
    input {
      border-color: #ff3d3d;
    }

    label:not(.long-label) {
      color: #ff3d3d;
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
