<template>
    <a :href="link" class="deal-card bg-primary-light flex flex-col items-center text-white px-row py-6 lg:h-full lg:p-10">
        <div
            class="deal-card-inner mb-8 w-full flex flex-col items-center border border-primary pt-10 pb-20 grow lg:justify-center">
            <div class="rounded-full border border-secondary h-16 w-16 flex items-center justify-center mb-8">
                <Icon name="sell" size="24" color="white" filled />
            </div>
            <h3 class="mb-5">{{ header }}</h3>
            <p class="text-white mb-7">{{ subheader }}</p>
            <span class="bg-primary-lighter py-2 px-3 flex mb-10 rounded items-center">
                <Icon name="schedule" size="12" color="white" class="mr-3" />
                <span class="smallcaps">{{ dates }}</span>
            </span>
            <a href="/" class="underline text-sm">Mark Your Calendar</a>
        </div>
        <p class="text-white font-bold mb-3 deal-card-more">Get More Details</p>
    </a>
</template>
<script setup>
const props = defineProps({
    header: {
        type: String,
        required: true,
    },
    subheader: {
        type: String,
        required: true,
    },
    dates: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
})
</script>