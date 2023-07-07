<template>
    <div class="py-5 accordion-item">
        <div class="flex justify-between">
            <div class="flex items-center">
                <img :src="`/images/accordion-icons/${item.icon}.svg`" class="mr-3" />
                <span class="text-gray-dark">{{ item.name }}</span>
            </div>
            <div class="h-5 w-5 flex justify-center items-center rounded-full bg-secondary">
                <Icon :name="isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" size="sm" color="white" />
            </div>
        </div>
        <Transition @enter="onAccordionEnter" @leave="onAccordionLeave">
            <div v-if="isOpen" v-html="item.html" class="accordion-item-content" style="overflow-y: hidden;"></div>
        </Transition>
    </div>
</template>
<script setup>
import gsap from 'gsap';

const props = defineProps({
    isOpen: Boolean,
    item: Object
})

const onAccordionEnter = (el) => {
    gsap.from(el, {
        height: 0,
        duration: 0.25,
    })
}

const onAccordionLeave = (el, done) => {
    gsap.to(el, {
        height: 0,
        duration: 0.25,
        onComplete: done
    })
}
</script>