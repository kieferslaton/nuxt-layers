<template>
  <div :class="['accordion-item w-full', itemClasses]">
    <div :class="[headerClasses, 'flex items-center justify-between gap-8']">
      <div class="flex items-center">
        <img
          v-if="item.icon"
          :src="`/images/accordion-icons/${item.icon}.svg`"
          class="mr-3"
        />
        <span v-if="step" class="mr-3 font-bold text-gray-dark"
          >Step {{ step }}:</span
        >
        <span>{{ item.header }}</span>
      </div>
      <div
        class="flex h-5 w-5 items-center justify-center rounded-full bg-secondary"
      >
        <Icon
          :name="isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          size="sm"
          color="white"
        />
      </div>
    </div>
    <Transition @enter="onAccordionEnter" @leave="onAccordionLeave">
      <div
        v-if="isOpen"
        v-html="item.content"
        :class="[contentClasses, 'accordion-item-content content']"
        style="overflow-y: hidden"
      ></div>
    </Transition>
  </div>
</template>
<script setup>
import gsap from "gsap";

const props = defineProps({
  isOpen: Boolean,
  item: Object,
  step: Number,
  itemClasses: {
    type: String,
    default: "",
  },
  headerClasses: {
    type: String,
    default: "",
  },
  contentClasses: {
    type: String,
    default: "",
  },
});

const onAccordionEnter = (el) => {
  gsap.from(el, {
    height: 0,
    duration: 0.25,
  });
};

const onAccordionLeave = (el, done) => {
  gsap.to(el, {
    height: 0,
    duration: 0.25,
    onComplete: done,
  });
};
</script>
