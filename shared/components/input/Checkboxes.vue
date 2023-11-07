<template>
  <div class="flex w-full" :class="class">
    <div class="flex flex-col">
      <span class="mb-2 text-base font-bold text-gray-dark">{{ label }}</span>
      <small class="text-gray-dark">(Check All That Apply)</small>
    </div>
    <div class="ml-12">
      <label
        v-for="item in options"
        :key="item.value"
        class="mb-4 flex items-center justify-start"
      >
        <div>
          <input
            type="checkbox"
            :value="item.value"
            class="absolute opacity-0"
            v-model="localValue"
            @change="onChange"
            :disabled="disable === item.value"
          />
          <div
            v-if="localValue.includes(item.value)"
            class="flex h-6 w-6 items-center justify-center rounded-sm"
            :class="disable === item.value ? 'bg-gray-light' : 'bg-secondary'"
          >
            <Icon name="check" size="md" color="white" />
          </div>
          <div
            v-else
            class="flex h-6 w-6 items-center justify-center rounded-sm border border-gray-dark"
          ></div>
        </div>
        <span
          class="ml-4"
          :class="disable === item.value ? 'text-gray-light' : 'text-gray-dark'"
          >{{ item.label }}</span
        >
      </label>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  label: String,
  options: Array,
  modelValue: Array,
  class: String,
  disable: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["update:modelValue"]);

let localValue = ref([...props.modelValue]);

watchEffect(() => {
  localValue.value = [...props.modelValue];
});

const onChange = () => {
  emits("update:modelValue", localValue.value);
};
</script>
