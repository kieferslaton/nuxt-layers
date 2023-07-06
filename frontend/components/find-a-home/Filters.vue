<template>
    <form class="lg:flex lg:flex-row-reverse lg:items-center lg:justify-between lg:bg-primary-lighter lg:p-10">
        <div class="w-full relative mb-6 lg:w-[25vw] lg:mb-0">
            <Icon name="search" size="sm" color="gray-light" class="absolute top-1/2 left-3 transform -translate-y-1/2" />
            <input class="w-full p-4 pl-10 rounded-sm text-black text-base placeholder-black" type="text"
                :value="searchTerm" @input="updateValue('searchTerm', $event.target.value)"
                placeholder="Search by Model Name or Serial #" />
        </div>
        <div class="relative">
            <div class="flex overflow-x-scroll -mr-row">
                <button class="py-2 px-5 border border-primary-light rounded-md mr-3 flex items-center"
                    @click.prevent="$emit('filter-change', 'all')">
                    <Icon name="tune" size="md" color="secondary" class="mr-3" />
                    Filters
                </button>
                <button class="py-2 px-5 border border-primary-light rounded-md mr-3" v-for="filter in filters"
                    @click.prevent="$emit('filter-change', filter)"> {{ filter }}</button>
            </div>
            <div class="absolute top-0 w-full bg-white text-gray-dark flex flex-col items-center py-row px-row rounded-sm lg:w-[200%]"
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
                            class="filter-btn" :class="{ 'filter-btn-active': size === item.value }"
                            @click.prevent="updateValue('size', item.value)">{{ item.label }}</button>
                    </div>
                </div>
                <div class="w-full mb-4" v-if="activeFilter === 'all' || activeFilter === 'Bed/Bath'">
                    <h5 class="font-bold mb-4">Bed/Bath</h5>
                    <div class="flex items-center overflow-x-scroll">
                        <button
                            v-for="item in [{ value: 0, label: 'Any' }, { value: 2, label: '2' }, { value: 3, label: '3' }, { value: 4, label: '4' }, { value: 5, label: '5' }]"
                            class="filter-btn" :class="{ 'filter-btn-active': bedrooms === item.value }"
                            @click.prevent="updateValue('bedrooms', item.value)">{{
                                item.label }}</button>
                    </div>
                </div>
                <button @click.prevent="$emit('filter-change', null)"
                    class="absolute top-4 right-4 rounded-full bg-gray-lighter flex items-center justify-center p-2">
                    <Icon name="close" size="md" color="gray-dark" />
                </button>
            </div>
        </div>
    </form>
</template>
  
<script setup>
const props = defineProps({
    filters: {
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

const emit = defineEmits([
    'filter-change',
    'update:searchTerm',
    'update:condition',
    'update:size',
    'update:bedrooms'
])

const updateValue = (name, value) => {
    emit(`update:${name}`, value)
}
</script>
  