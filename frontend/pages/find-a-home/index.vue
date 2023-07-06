<template>
  <div class="home-archive">
    <div class="px-row border-t border-b border-primary-light py-6 lg:px-row2x lg:border-none lg:pb-0">
      <span class="flex items-center mb-4">
        <Icon name="home" color="white" size="sm" filled class="mr-2" />
        <span class="smallcaps text-gray-lighter text-[0.65rem] font-light">Find a Home</span>
      </span>
      <FindAHomeFilters :filters="filters" :activeFilter="activeFilter" :searchTerm="filterState.searchTerm"
        :condition="filterState.condition" :size="filterState.size" :bedrooms="filterState.bedrooms"
        @filter-change="activeFilter = $event" @update:searchTerm="filterState.searchTerm = $event"
        @update:condition="filterState.condition = $event" @update:size="filterState.size = $event"
        @update:bedrooms="filterState.bedrooms = $event" />
    </div>
    <div class="px-row homes lg:px-row2x lg:pt-row" v-if="homes && homes.length > 0" ref="homesList"
      :style="loading || !firstImageLoaded ? 'visibility: hidden; height: 0; overflow-y: hidden;' : 'padding-top: 10vw;'">
      <div class="flex justify-between items-center mb-row lg:flex-wrap">
        <span class="smallcaps text-gray-light">{{ totalRecords }} Results</span>
        <span class="smallcaps text-white flex items-center relative" @click.prevent="showSort = !showSort">
          <span class="mr-1">{{ sortText }}</span>
          <Icon v-if="sortIcon" :name="sortIcon" color="white" size="sm" class="mr-2" />
          <Icon name="expand_more" color="secondary" size="sm" class="ml-2" />
        </span>
      </div>
      <div class="flex flex-col lg:flex-row lg:flex-wrap lg:justify-between lg:gap-10">
        <a v-for="(home, index) in homes" :key="home.id"
          :href="`/find-a-home/${home.name.toLowerCase().replace(' ', '-')}`"
          class="pb-row2x block lg:w-[calc(33.333%-1.667rem)] lg:pb-28">
          <img @load="handleImageLoad(index)" :key="`${index}-${home.defaultImageUrl}`" :src="home.defaultImageUrl"
            :alt="home.name" class="aspect-square rounded-sm object-cover w-full mb-5" />
          <h2 class="font-serif text-4xl mb-2">{{ home.name }}</h2>
          <div class="flex justify-between">
            <h4
              v-html="home.beds && (`${home.beds} Bed / `) + (home.baths && `${home.baths} Bath / `) + (home.width && home.length && `${home.width * home.length}ft<sup>2</sup>`)">
            </h4>
            <h5 class="font-bold">{{ home.category }}</h5>
          </div>
        </a>
      </div>
      <div v-if="loadingMore">Loading...</div>
    </div>
    <Loader v-if="loading || !firstImageLoaded" />
  </div>
  <Transition @enter="onSortDrawerEnter" @leave="onSortDrawerLeave">
    <div
      class="fixed z-40 bottom-0 left-0 w-screen bg-white text-gray-dark flex flex-col items-start py-row px-row rounded-sm lg:w-[200%]"
      v-if="showSort">
      <h3 class="font-bold text-2xl text-gray-dark self-center mb-8">Sort By</h3>
      <ul class="w-full">
        <li v-for="item in [{ label: 'A-Z', value: 'alpha', abbr: 'A-Z' },
        { label: 'Square Feet (Low to High)', value: 'sqft_asc', abbr: 'SqFt', icon: 'arrow_upward' },
        { label: 'Square Feet (High to Low)', value: 'sqft_desc', abbr: 'SqFt', icon: 'arrow_downward' },
        { label: '# Bedrooms (Low to High)', value: 'beds_asc', abbr: 'Beds', icon: 'arrow_upward' },
        { label: '# Bedrooms (High to Low)', value: 'beds_desc', abbr: 'Beds', icon: 'arrow_downward' }
        ]" @click.prevent="handleSort(item)" class="py-4 text-gray-dark text-center w-full flex justify-between">
          <label :for="item.value">{{ item.label }}</label>
          <input type="radio" :name="item.value" :id="item.value" hidden />
          <div class="w-[16px] h-[16px] rounded-full flex items-center justify-center"
            :class="sort === item.value ? 'border-4 border-secondary' : 'border border-gray'">
          </div>
        </li>
      </ul>
      <button @click.prevent="showSort = false"
        class="absolute top-4 right-4 rounded-full bg-gray-lighter flex items-center justify-center p-2">
        <Icon name="close" size="md" color="gray-dark" />
      </button>
    </div>
  </Transition>
</template>
<script setup>
import gsap from 'gsap'

let page = ref(1)
let loading = ref(true)
let loadingMore = ref(false)
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
let sortText = ref('Sort')
let sortIcon = ref(null)

const homes = ref([])
let totalRecords = ref(0)

let firstImageLoaded = ref(false)

let handleImageLoad = (index) => {
  console.log(index)
  if (index === 0 && page.value === 1) {
    firstImageLoaded.value = true;
  }
}

let fetchHomes = async () => {
  try {
    if (page === 1) {
      firstImageLoaded.value = false;
      loading.value = true;
    }
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
      loadingMore.value = false;
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
    loadingMore.value = true
    page.value++
  }
}

const handleSort = (item) => {
  sort.value = item.value;
  sortText.value = item.abbr;
  sortIcon.value = item.icon;
  showSort.value = false;
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

function onSortDrawerEnter(el) {
  gsap.from(el, {
    yPercent: 100,
    duration: 0.25,
  })
}

function onSortDrawerLeave(el, done) {
  gsap.to(el, {
    yPercent: 100,
    duration: 0.25,
    onComplete: done
  })
}
</script>





