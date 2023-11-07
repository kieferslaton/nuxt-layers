<template>
  <div :class="[classes, 'text-input-container', { error: errors?.length }]">
    <label :for="id" :class="longLabel && 'long-label'">{{ label }}</label>
    <textarea
      :id="id"
      required
      :value="modelValue"
      :rows="lines"
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
  longLabel: Boolean,
  errors: Array,
  lines: Number,
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

  textarea {
    border: 1px solid #dddddd;
    width: 100%;
    padding: 1rem 1.5rem;
    border-radius: 25px;
    color: #333;

    &:focus {
      outline: 1px solid #3dbdff;
    }
  }

  &.error {
    textarea {
      border-color: #ff3d3d;
    }

    label:not(.long-label) {
      color: #ff3d3d;
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
