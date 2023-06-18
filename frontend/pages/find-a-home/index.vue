<template>
  <div class="home-archive">
    <div class="grid grid-cols-20  border-b border-primary-light pb-row2x">
      <h1 class="col-start-2 col-span-18 text-base font-bold mb-4">Find a Home</h1>
      <form class="col-start-2 col-span-18">
        <div class="w-full relative mb-6">
          <Icon name="search" size="sm" color="gray-light" class="absolute top-1/2 left-3 transform -translate-y-1/2" />
          <input class="w-full p-4 pl-10 rounded-sm text-black text-base placeholder-black" type="text"
            placeholder="Search by Model Name or Serial #" />
        </div>
        <div class="relative">
          <div class="flex overflow-x-scroll">
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
            <!-- TODO - These need to work-->
            <div class="w-full mb-4" v-if="activeFilter === 'all' || activeFilter === 'Type'">
              <h5 class="font-bold mb-4">Type</h5>
              <label class="flex items-center justify-between border-b border-gray-light py-4">
                New
                <input type="checkbox" id="new" name="new" value="new" class="hidden" />
                <div class="bg-gray-light rounded-sm h-4 w-4 flex items-center justify-center"></div>
              </label>
              <label class="flex items-center justify-between border-b border-gray-light py-4">
                Pre-Owned
                <input type="checkbox" id="new" name="new" value="new" class="hidden" />
                <div class="bg-gray-light rounded-sm h-4 w-4 flex items-center justify-center"></div>
              </label>
              <label class="flex items-center justify-between py-4">
                Clearance
                <input type="checkbox" id="new" name="new" value="new" class="hidden" />
                <div class="bg-success rounded-sm h-4 w-4 flex items-center justify-center">
                  <Icon name="check" size="sm" color="white" />
                </div>
              </label>
            </div>
            <div class="w-full mb-4" v-if="activeFilter === 'all' || activeFilter === 'Size'">
              <h5 class="font-bold mb-4">Size</h5>
              <div class="flex items-center overflow-x-scroll">
                <button class="py-2 px-5 bg-primary rounded-md mr-3 text-white font-bold">Any</button>
                <button class="py-2 px-5 border border-gray-light rounded-md mr-3">Single-Section</button>
                <button class="py-2 px-5 border border-gray-light rounded-md mr-3">Multi-Section</button>
              </div>
            </div>
            <div class="w-full mb-4" v-if="activeFilter === 'all' || activeFilter === 'Bed/Bath'">
              <h5 class="font-bold mb-4">Bed/Bath</h5>
              <div class="flex items-center overflow-x-scroll">
                <button class="py-2 px-5 bg-primary rounded-md mr-3 text-white font-bold">Any</button>
                <button class="py-2 px-5 border border-gray-light rounded-md mr-3">2+</button>
                <button class="py-2 px-5 border border-gray-light rounded-md mr-3">3+</button>
                <button class="py-2 px-5 border border-gray-light rounded-md mr-3">4+</button>
                <button class="py-2 px-5 border border-gray-light rounded-md mr-3">5+</button>
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
    <div class="grid grid-cols-20 homes pt-row2x" v-if="homes && homes.length > 0">
      <div class="flex col-start-2 col-span-18 justify-between items-center mb-row">
        <span class="uppercase text-sm text-gray-light tracking-wider">{{ totalRecords }} Results</span>
        <span class="uppercase text-sm text-white tracking-wider flex items-center">Sort
          <Icon name="expand_more" color="secondary" size="sm" class="ml-2" />
        </span>
      </div>
      <div v-for="home in homes" :key="home.id" class="col-start-2 col-span-18 pb-row2x">
        <img :src="home.defaultImageUrl" :alt="home.name" class="aspect-square rounded-sm object-cover w-full mb-5" />
        <h2 class="font-serif text-4xl">{{ home.name }}</h2>
        <div class="flex justify-between">
          <h4
            v-html="home.beds && (`${home.beds} Bed/`) + (home.baths && `${home.baths} Bath/`) + (home.width && home.length && `${home.width}x${home.length}ft<sup>2</sup>`)">
          </h4>
          <h5 class="font-bold">{{ home.category }}</h5>
        </div>
      </div>
      <div v-if="loading">Loading...</div>
    </div>
  </div>
</template>
<script setup>

let page = ref(1)
let homes = ref([])
let totalRecords = ref(10)
let loading = ref(false)
let filters = ['Type', 'Size', 'Bed/Bath']
let activeFilter = ref(null);

const fetchHomes = async () => {
  if (homes.value.length >= totalRecords.value) return;
  loading.value = true
  const { data } = await fetch(`/api/homes?page=${page.value}`).then(res => res.json())
  if (!data) return;
  homes.value = [...homes.value, ...(data.inventoryItems || [])]
  totalRecords.value = data.totalRecords
  loading.value = false
  page.value++
}

const handleScroll = () => {
  const bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
  if (bottomOfWindow) {
    fetchHomes()
  }
}

onMounted(() => {
  fetchHomes()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>