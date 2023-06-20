<template>
  <div class="home-archive">
    <div class="px-row border-b border-primary-light pb-row2x">
      <Tag tag="Find a Home" class="mb-10" />
      <form class="col-start-2 col-span-18">
        <div class="w-full relative mb-6">
          <Icon name="search" size="sm" color="gray-light" class="absolute top-1/2 left-3 transform -translate-y-1/2" />
          <input class="w-full p-4 pl-10 rounded-sm text-black text-base placeholder-black" type="text"
            v-model="searchTerm" placeholder="Search by Model Name or Serial #" />
        </div>
        <div class="relative">
          <div class="flex overflow-x-scroll -mr-row">
            <button class="py-2 px-5 border border-primary-light rounded-md mr-3 flex items-center"
              @click.prevent="activeFilter = 'all'">
              <Icon name="tune" size="md" color="secondary" class="mr-3" />
              Filters
            </button>
            <button class="py-2 px-5 border border-primary-light rounded-md mr-3" v-for="filter in filters"
              @click.prevent="activeFilter = filter"> {{ filter }}</button>
          </div>
          <div class="absolute top-0 w-full bg-white text-gray-dark flex flex-col items-center py-row px-row rounded-sm"
            v-if="activeFilter">
            <h3 class="font-bold text-2xl">Filters</h3>
            <div class="w-full mb-4" v-if="activeFilter === 'all' || activeFilter === 'Type'">
              <h5 class="font-bold mb-4">Type</h5>
              <label
                v-for="item in [{ value: 1, label: 'New' }, { value: 2, label: 'Pre-Owned' }, { value: 3, label: 'Clearance' }]"
                class="flex items-center justify-between border-b border-gray-light py-4">
                {{ item.label }}
                <input type="checkbox" :value="item.value" class="hidden" v-model="condition" />
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
                  @click.prevent="size = item.value">{{ item.label }}</button>
              </div>
            </div>
            <div class="w-full mb-4" v-if="activeFilter === 'all' || activeFilter === 'Bed/Bath'">
              <h5 class="font-bold mb-4">Bed/Bath</h5>
              <div class="flex items-center overflow-x-scroll">
                <button
                  v-for="item in [{ value: 0, label: 'Any' }, { value: 2, label: '2' }, { value: 3, label: '3' }, { value: 4, label: '4' }, { value: 5, label: '5' }]"
                  class="filter-btn" :class="{ 'filter-btn-active': bedrooms === item.value }"
                  @click.prevent="bedrooms = item.value">{{
                    item.label }}</button>
              </div>
            </div>
            <button @click="activeFilter = null"
              class="absolute top-4 right-4 rounded-full bg-gray-lighter flex items-center justify-center p-2">
              <Icon name="close" size="md" color="gray-dark" />
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="px-row homes pt-row2x" v-if="homes && homes.length > 0" ref="homesList">
      <div class="flex justify-between items-center mb-row">
        <span class="smallcaps text-gray-light">{{ totalRecords }} Results</span>
        <span class="smallcaps text-white flex items-center">Sort
          <Icon name="expand_more" color="secondary" size="sm" class="ml-2" />
        </span>
      </div>
      <a v-for="home in homes" :key="home.id" :href="`/find-a-home/${home.name.toLowerCase().replace(' ', '-')}`"
        class="pb-row2x block">
        <img :src="home.defaultImageUrl" :alt="home.name" class="aspect-square rounded-sm object-cover w-full mb-5" />
        <h2 class="font-serif text-4xl mb-2">{{ home.name }}</h2>
        <div class="flex justify-between">
          <h4
            v-html="home.beds && (`${home.beds} Bed / `) + (home.baths && `${home.baths} Bath / `) + (home.width && home.length && `${home.width * home.length}ft<sup>2</sup>`)">
          </h4>
          <h5 class="font-bold">{{ home.category }}</h5>
        </div>
      </a>
      <div v-if="loading">Loading...</div>
    </div>
  </div>
</template>
<script setup>
let page = ref(1)
let loading = ref(false)
let filters = ['Type', 'Size', 'Bed/Bath']
let activeFilter = ref(null)

let searchTerm = ref('')
let condition = ref([1])
let size = ref(0)
let bedrooms = ref(0)

const { data } = await useAsyncData(
  'homes',
  async () => {
    const response = await $fetch('/api/homes', {
      params: {
        page: page.value,
        searchTerm: searchTerm.value,
        condition: condition.value,
        size: size.value,
        bedrooms: bedrooms.value
      }
    })
    return response.data
  }, {
  watch: [searchTerm, condition, size, bedrooms],
}
)

// Define a computed property to update homes when data changes
const homes = computed(() => data.value ? data.value.inventoryItems : []);

// Access the totalRecords value from data directly
const totalRecords = data.value ? data.value.totalRecords : 0;


const handleScroll = () => {
  const sectionRect = homesList.value.getBoundingClientRect()

  const bottomOfSection = sectionRect.top + sectionRect.height <= window.innerHeight

  if (bottomOfSection && !loading.value && homes.value.length < totalRecords.value) {
    fetchHomes()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

