<template>
    <a :href="`/find-a-home/${home.name.toLowerCase().replace(' ', '-')}`" class="home-card block" :style="{
        'background-image': `linear-gradient(to bottom, transparent, rgba(0,0,0,0.4)), url('${home.defaultImageUrl}')`
    }">
        <div class="home-card-details">
            <div class="flex w-full items-center mb-3">
                <h2 class="leading-none">{{ home.name }}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="23.848" viewBox="0 0 56 23.848">
                    <g id="Group_959" data-name="Group 959" transform="translate(-339.569 -612.937)">
                        <path id="Path_252" data-name="Path 252" d="M348.569,1674.861h54s-7.612-6.8-7.492-10.9"
                            transform="translate(-8 -1050)" fill="none" stroke="#3dbdff" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2" />
                        <path id="Path_253" data-name="Path 253" d="M348.569,1663.966h54s-7.612,6.8-7.492,10.9"
                            transform="translate(-8 -1039.105)" fill="none" stroke="#3dbdff" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2" />
                    </g>
                </svg>
            </div>
            <div class="flex w-full justify-between">
                <span>{{ home.beds }} Bed / {{ home.baths }}Bath / {{ home.length * home.width }}ft<sup>2</sup></span>
                <span class="font-bold">{{ home.category }}</span>
            </div>
        </div>
    </a>
</template>
<script setup>
const props = defineProps({
    home: {
        type: Object,
        required: true
    }
});
</script>