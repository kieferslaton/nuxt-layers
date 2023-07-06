<template>
  <div class="home-archive">
    <div class="px-row border-b border-primary-light pb-row2x lg:px-row2x lg:border-none lg:pb-0">
      <Tag tag="Find a Home" class="mb-10 lg:hidden" />
      <FindAHomeFilters :filters="filters" :activeFilter="activeFilter" :searchTerm="filterState.searchTerm"
        :condition="filterState.condition" :size="filterState.size" :bedrooms="filterState.bedrooms"
        @filter-change="activeFilter = $event" @update:searchTerm="filterState.searchTerm = $event"
        @update:condition="filterState.condition = $event" @update:size="filterState.size = $event"
        @update:bedrooms="filterState.bedrooms = $event" />
    </div>
    <div class="px-row homes pt-row2x lg:px-row2x lg:pt-row" v-if="homes && homes.length > 0" ref="homesList">
      <div class="flex justify-between items-center mb-row lg:flex-wrap">
        <span class="smallcaps text-gray-light">{{ totalRecords }} Results</span>
        <span class="smallcaps text-white flex items-center relative" @click.prevent="showSort = !showSort">Sort
          <Icon name="expand_more" color="secondary" size="sm" class="ml-2" />
          <div class="absolute top-[calc(100%+10px)] right-0 bg-white min-w-max" v-if="showSort">
            <ul class="border border-gray-lighter">
              <li v-for="item in [{ label: 'A-Z', value: 'alpha' },
              { label: 'Square Feet (Low to High)', value: 'sqft_asc' },
              { label: 'Square Feet (High to Low)', value: 'sqft_desc' },
              { label: '# Bedrooms (Low to High)', value: 'beds_asc' },
              { label: '# Bedrooms (High to Low)', value: 'beds_desc' }
              ]" @click.prevent="handleSort(item.value)"
                class="p-4 border-b border-gray-lighter text-gray-dark text-center hover:bg-primary-lighter hover:text-white">
                {{ item.label }}</li>
            </ul>
          </div>
        </span>
      </div>
      <div class="flex flex-col lg:flex-row lg:flex-wrap lg:justify-between lg:gap-10">
        <a v-for="home in homes" :key="home.id" :href="`/find-a-home/${home.name.toLowerCase().replace(' ', '-')}`"
          class="pb-row2x block lg:w-[calc(33.333%-1.667rem)] lg:pb-28">
          <img :src="home.defaultImageUrl" :alt="home.name" class="aspect-square rounded-sm object-cover w-full mb-5" />
          <h2 class="font-serif text-4xl mb-2">{{ home.name }}</h2>
          <div class="flex justify-between">
            <h4
              v-html="home.beds && (`${home.beds} Bed / `) + (home.baths && `${home.baths} Bath / `) + (home.width && home.length && `${home.width * home.length}ft<sup>2</sup>`)">
            </h4>
            <h5 class="font-bold">{{ home.category }}</h5>
          </div>
        </a>
      </div>
      <div v-if="loading">Loading...</div>
    </div>
  </div>
</template>
<script setup>
let page = ref(1)
let loading = ref(false)
let filters = ['Type', 'Size', 'Bed/Bath']
let activeFilter = ref(null)
let showSort = ref(false)
const homesList = ref();

const filterState = reactive({
  searchTerm: '',
  condition: [1],
  size: 0,
  bedrooms: 0,
})

let sort = ref('default')

const homes = ref([])
let totalRecords = ref(0)

let fetchHomes = async () => {
  try {
    const response = await $fetch('/api/homes', {
      params: {
        page: page.value,
        searchTerm: filterState.searchTerm,
        condition: filterState.condition,
        size: filterState.size,
        bedrooms: filterState.bedrooms,
        sort: sort.value
      }
    })
    console.log(response)
    if (response) {
      loading.value = false;
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
}

watch(filterState, async () => {
  page.value = 1;
  const response = await fetchHomes()
  if (response) {
    homes.value = response.inventoryItems;
    totalRecords.value = response.totalRecords;
  }
}, { deep: true })

watch(sort, async () => {
  console.log(sort.value)
  page.value = 1;
  const response = await fetchHomes()
  console.log(response)
  if (response) {
    homes.value = response.inventoryItems;
    totalRecords.value = response.totalRecords;
  }
})

watch(page, async () => {
  const response = await fetchHomes()
  if (response) {
    homes.value = [...homes.value, ...response.inventoryItems];
  }
})

const handleScroll = () => {
  const sectionRect = homesList.value.getBoundingClientRect()
  const bottomOfSection = sectionRect.top + sectionRect.height <= window.innerHeight

  if (totalRecords.value > homes.value.length && bottomOfSection && !loading.value) {
    loading.value = true
    page.value++
  }
}

const handleSort = (val) => {
  sort.value = val;
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  const response = await fetchHomes()
  if (response) {
    homes.value = response.inventoryItems;
    totalRecords.value = response.totalRecords;
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>





