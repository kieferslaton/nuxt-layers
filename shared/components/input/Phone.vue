<template>
  <div :class="[classes, 'text-input-container', { error: errors?.length }]">
    <label :for="id">{{ label }}</label>
    <input
      type="text"
      :id="id"
      required
      :value="displayValue"
      @blur="$emit('blur')"
      @input="onInput"
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
// The value to display in the input field, including formatting.
const displayValue = ref("");

// Format the model value into the display format.
const formatPhoneNumber = (phone) => {
  console.log(phone.length);
  let cleanPhone =
    phone.length === 1
      ? phone.replace(/\D/g, "")
      : phone.slice(1).replace(/\D/g, ""); // remove any non-digit characters
  let formattedPhone = "";

  switch (cleanPhone.length) {
    case 0:
    case 1:
    case 2:
      formattedPhone = `(${cleanPhone}`;
      break;
    case 3:
      formattedPhone = `(${cleanPhone}) `;
      break;
    case 4:
    case 5:
    case 6:
      formattedPhone = `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(3)}`;
      break;
    case 7:
      formattedPhone = `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(
        3,
        6
      )}-${cleanPhone.slice(6)}`;
      break;
    case 8:
    case 9:
    case 10:
      formattedPhone = `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(
        3,
        6
      )}-${cleanPhone.slice(6)}`;
      break;
    default:
      formattedPhone = `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(
        3,
        6
      )}-${cleanPhone.slice(6, 10)}`;
      break;
  }

  return `+1 ${formattedPhone}`;
};

// When the modelValue prop changes, update the display value.
watch(
  () => props.modelValue,
  (newVal) => {
    displayValue.value = formatPhoneNumber(newVal);
  }
);

// Handle input events from the input element.
const onInput = (event) => {
  // Update the model value without the formatting.
  emits(
    "update:modelValue",
    event.target.value.replace(/\D/g, "").substring(0, 11)
  );
};
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
