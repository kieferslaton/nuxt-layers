<template>
    <form class="lg:flex lg:flex-row-reverse lg:items-center lg:justify-between lg:bg-primary-lighter lg:p-10">
        <div class="w-full relative mb-8 lg:w-[25vw] lg:mb-0">
            <Icon name="search" size="sm" color="gray-dark" class="absolute top-1/2 left-4 transform -translate-y-1/2" />
            <input
                class="w-full p-4 pl-10 rounded-full text-black text-base placeholder-black focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-200 ease-in-out"
                type="text" :value="searchTerm" @input="updateValue('searchTerm', $event.target.value)"
                placeholder="Search by Model Name or Serial #" />
        </div>
        <div class="relative">
            <div class="flex overflow-x-scroll -mr-row lg:overflow-x-auto">
                <button class="py-2 px-5 border border-primary-light rounded-md mr-3 flex items-center"
                    @click.prevent="$emit('filter-change', 'all')">
                    <Icon name="tune" size="md" color="secondary" class="mr-3" />
                    Filters
                </button>
                <button class="py-2 px-5 border border-primary-light rounded-md mr-3"
                    :class="appliedFilters.includes(filter.value) ? 'border-none bg-secondary' : ''"
                    v-for="filter in filters" @click.prevent="$emit('filter-change', filter.label)"> {{ filter.label
                    }}</button>
            </div>
            <Transition @enter="onFilterDrawerEnter" @leave="onFilterDrawerLeave">
                <div class="fixed z-40 bottom-0 left-0 w-screen bg-white text-gray-dark flex flex-col items-center py-row px-row rounded-sm lg:w-[200%]"
                    v-if="activeFilter">
                    <h3 class="font-bold text-2xl">Filters</h3>
                    <div class="w-full mb-4" v-if="activeFilter === 'all' || activeFilter === 'Type'">
                        <h5 class="font-bold mb-4">Type</h5>
                        <label
                            v-for="item in [{ value: 1, label: 'New' }, { value: 2, label: 'Pre-Owned' }, { value: 3, label: 'Clearance' }]"
                            class="flex items-center justify-between border-b border-gray-light py-4">
                            {{ item.label }}
                            <input type="checkbox" :value="item.value" class="hidden"
                                @change="updateValue('condition', item.value)" />
                            <div v-if="condition.includes(item.value)"
                                class="bg-success rounded-sm h-4 w-4 flex items-center justify-center">
                                <Icon name="check" size="sm" color="white" />
                            </div>
                            <div v-else class="bg-gray-light rounded-sm h-4 w-4 flex items-center justify-center"></div>
                        </label>
                    </div>
                    <div class="w-full mb-4" v-if="activeFilter === 'all' || activeFilter === 'Size'">
                        <h5 class="font-bold mb-4">Size</h5>
                        <div class="flex items-center overflow-x-scroll">
                            <button
                                v-for="item in [{ value: 0, label: 'Any' }, { value: 1, label: 'Single' }, { value: 2, label: 'Double' }]"
                                class="filter-btn" :class="{ 'filter-btn-active': localSize === item.value }"
                                @click.prevent="updateValue('size', item.value)">{{ item.label }}</button>
                        </div>
                    </div>
                    <div class="w-full mb-4" v-if="activeFilter === 'all' || activeFilter === 'Bed/Bath'">
                        <h5 class="font-bold mb-4">Bed/Bath</h5>
                        <div class="flex items-center overflow-x-scroll">
                            <button
                                v-for="item in [{ value: 0, label: 'Any' }, { value: 2, label: '2' }, { value: 3, label: '3' }, { value: 4, label: '4' }, { value: 5, label: '5' }]"
                                class="filter-btn" :class="{ 'filter-btn-active': localBedrooms === item.value }"
                                @click.prevent="updateValue('bedrooms', item.value)">{{
                                    item.label }}</button>
                        </div>
                    </div>
                    <div class="w-full mb-4 flex justify-between items-center mt-6">
                        <a href="#" @click.prevent="clearFilters" class="text-gray-dark underline">Clear All</a>
                        <button @click.prevent="applyFilters" :disabled="!filtersChanged"
                            :class="filtersChanged ? 'btn btn-secondary btn-smallcaps py-4' : 'btn btn-gray-lighter btn-smallcaps py-4'">Apply
                            Filters</button>

                    </div>
                    <button @click.prevent="$emit('filter-change', null)"
                        class="absolute top-4 right-4 rounded-full bg-gray-lighter flex items-center justify-center p-2">
                        <Icon name="close" size="md" color="gray-dark" />
                    </button>
                </div>
            </Transition>
        </div>
    </form>
</template>
  
<script setup>
import gsap from 'gsap'
const props = defineProps({
    filters: {
        type: Array,
        default: () => [],
    },
    appliedFilters: {
        type: Array,
        default: () => [],
    },
    activeFilter: {
        type: String,
        default: null,
    },
    searchTerm: {
        type: String,
        default: '',
    },
    condition: {
        type: Array,
        default: () => [],
    },
    size: {
        type: Number,
        default: 0,
    },
    bedrooms: {
        type: Number,
        default: 0,
    },
})

//These are to store local changes before the filter is applied
const localCondition = ref([...props.condition]);
const localSize = ref(props.size);
const localBedrooms = ref(props.bedrooms);

const filtersChanged = computed(() => {
    return JSON.stringify(localCondition.value) !== JSON.stringify(props.condition) ||
        localSize.value !== props.size ||
        localBedrooms.value !== props.bedrooms;
});



const emit = defineEmits([
    'filter-change',
    'update: searchTerm',
    'update:condition',
    'update:size',
    'update:bedrooms'
])

const updateValue = (name, value) => {
    switch (name) {
        case 'condition':
            if (localCondition.value.includes(value)) {
                localCondition.value = localCondition.value.filter(item => item !== value);
            } else {
                localCondition.value.push(value);
            }
            break;
        case 'size':
            localSize.value = value;
            break;
        case 'bedrooms':
            localBedrooms.value = value;
            break;
        case 'searchTerm':
            emit('update:searchTerm', value);
            break;
    }
}

const applyFilters = () => {
    emit('update:condition', localCondition.value);
    emit('update:size', localSize.value);
    emit('update:bedrooms', localBedrooms.value);
    emit('filter-change', null);
}

const clearFilters = () => {
    localBedrooms.value = 0;
    localSize.value = 0;
    localCondition.value = [];
    emit('update:condition', []);
    emit('update:size', 0);
    emit('update:bedrooms', 0);
    emit('filter-change', null);
}


function onFilterDrawerEnter(el) {
    gsap.from(el, {
        yPercent: 100,
        duration: 0.25,
    })
}

function onFilterDrawerLeave(el, done) {
    console.log(el)
    gsap.to(el, {
        yPercent: 100,
        duration: 0.25,
        onComplete: done
    })
}
</script>
  