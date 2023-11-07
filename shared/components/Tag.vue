<template>
    <div class="flex items-center" :class="class">
        <Icon name="label" color="primary-lighter" size="18" filled class="mr-4" />
        <h4>{{ tag }}</h4>
    </div>
</template>
<script setup>
const props = defineProps({
    tag: {
        type: String,
        required: true
    },
    class: {
        type: String,
        default: ''
    }
});
</script>