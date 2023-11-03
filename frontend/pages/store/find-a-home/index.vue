<template>
  <div class="home-archive">
    <div
      class="border-b border-t border-primary-light px-row py-6 lg:border-none lg:px-row2x lg:py-0"
    >
      <Breadcrumb title="Find a Home" />
      <FindAHomeFilters
        :filters="filters"
        :appliedFilters="appliedFilters"
        :activeFilter="activeFilter"
        :searchTerm="filterState.searchTerm"
        :condition="filterState.condition"
        :size="filterState.size"
        :bedrooms="filterState.bedrooms"
        @filter-change="activeFilter = $event"
        @update:searchTerm="filterState.searchTerm = $event"
        @update:condition="filterState.condition = $event"
        @update:size="filterState.size = $event"
        @update:bedrooms="filterState.bedrooms = $event"
      />
    </div>
    <div
      class="homes px-row lg:px-row2x lg:!pt-10"
      v-if="homes && homes.length > 0"
      ref="homesList"
      :style="
        loading || !firstImageLoaded
          ? 'visibility: hidden; height: 0; overflow-y: hidden;'
          : 'padding-top: 5vw;'
      "
    >
      <div
        class="mb-row flex items-center justify-between lg:mb-10 lg:flex-wrap"
      >
        <span class="smallcaps text-gray-light"
          >{{ totalRecords }} Results</span
        >
        <span
          class="smallcaps relative flex items-center text-white"
          @click.prevent="showSort = !showSort"
        >
          <span class="mr-1">{{ sortText }}</span>
          <Icon
            v-if="sortIcon"
            :name="sortIcon"
            color="white"
            size="sm"
            class="mr-2"
          />
          <Icon name="expand_more" color="secondary" size="sm" class="ml-2" />
        </span>
      </div>
      <div
        class="flex flex-col lg:flex-row lg:flex-wrap lg:justify-between lg:gap-10"
      >
        <a
          v-for="(home, index) in homes"
          :key="home.id"
          :href="`/find-a-home/${home.name.toLowerCase().replace(' ', '-')}`"
          class="block pb-row2x lg:w-[calc(33.333%-1.667rem)] lg:pb-28"
        >
          <nuxt-img
            @load="handleImageLoad(index)"
            :key="`${index}-${home.defaultImageUrl}`"
            :src="home.defaultImageUrl"
            :alt="home.name"
            class="mb-5 aspect-square w-full rounded-sm object-cover"
          />
          <h2 class="mb-2 font-serif text-4xl">{{ home.name }}</h2>
          <div class="flex justify-between">
            <h4
              v-html="
                home.beds &&
                `${home.beds} Bed / ` +
                  (home.baths && `${home.baths} Bath / `) +
                  (home.width &&
                    home.length &&
                    `${home.width * home.length}ft<sup>2</sup>`)
              "
            ></h4>
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
      class="fixed bottom-0 left-0 z-40 flex w-screen flex-col items-start rounded-sm bg-white px-row py-row text-gray-dark lg:w-[200%]"
      v-if="showSort"
    >
      <h3 class="mb-8 self-center text-2xl font-bold text-gray-dark">
        Sort By
      </h3>
      <ul class="w-full">
        <li
          v-for="item in [
            { label: 'A-Z', value: 'alpha', abbr: 'A-Z' },
            {
              label: 'Square Feet (Low to High)',
              value: 'sqft_asc',
              abbr: 'SqFt',
              icon: 'arrow_upward',
            },
            {
              label: 'Square Feet (High to Low)',
              value: 'sqft_desc',
              abbr: 'SqFt',
              icon: 'arrow_downward',
            },
            {
              label: '# Bedrooms (Low to High)',
              value: 'beds_asc',
              abbr: 'Beds',
              icon: 'arrow_upward',
            },
            {
              label: '# Bedrooms (High to Low)',
              value: 'beds_desc',
              abbr: 'Beds',
              icon: 'arrow_downward',
            },
          ]"
          @click.prevent="handleSort(item)"
          class="flex w-full justify-between py-4 text-center text-gray-dark"
        >
          <label :for="item.value">{{ item.label }}</label>
          <input type="radio" :name="item.value" :id="item.value" hidden />
          <div
            class="flex h-[16px] w-[16px] items-center justify-center rounded-full"
            :class="
              sort === item.value
                ? 'border-4 border-secondary'
                : 'border border-gray'
            "
          ></div>
        </li>
      </ul>
      <button
        @click.prevent="showSort = false"
        class="absolute right-4 top-4 flex items-center justify-center rounded-full bg-gray-lighter p-2"
      >
        <Icon name="close" size="md" color="gray-dark" />
      </button>
    </div>
  </Transition>
</template>
<script setup>
import gsap from "gsap";

let page = ref(1);
let loading = ref(true);
let loadingMore = ref(false);
let filters = [
  {
    label: "Type",
    value: "condition",
  },
  {
    label: "Size",
    value: "size",
  },
  {
    label: "Bed/Bath",
    value: "bedrooms",
  },
];

let activeFilter = ref(null);
let showSort = ref(false);
const homesList = ref();

const filterDefaults = {
  searchTerm: "",
  condition: [1],
  size: null,
  bedrooms: null,
};

const filterState = reactive({ ...filterDefaults });

const appliedFilters = computed(() => {
  return Object.keys(filterState).filter((key) => {
    if (Array.isArray(filterState[key])) {
      return filterState[key].length !== filterDefaults[key].length;
    }
    return filterState[key] !== filterDefaults[key];
  });
});

let sort = ref("default");
let sortText = ref("Sort");
let sortIcon = ref(null);

const homes = ref([]);
let totalRecords = ref(0);

let allowImageLoad = ref(false);
let firstImageLoaded = ref(false);

let handleImageLoad = (index) => {
  if (index === 0 && page.value === 1) {
    firstImageLoaded.value = true;
  }
};

let fetchHomes = async () => {
  try {
    if (page.value === 1) {
      allowImageLoad.value = false;
      firstImageLoaded.value = false;
      loading.value = true;
      setTimeout(() => (allowImageLoad.value = true), 1000);
    }
    const data = await $fetch("/api/homes", {
      params: {
        page: page.value,
        searchTerm: filterState.searchTerm,
        condition: filterState.condition,
        size: filterState.size,
        bedrooms: filterState.bedrooms,
        sort: sort.value,
      },
    });
    if (data) {
      console.log(data);
      loading.value = false;
      loadingMore.value = false;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

watch(
  filterState,
  async () => {
    page.value = 1;
    const data = await fetchHomes();
    if (data) {
      homes.value = data.items;
      totalRecords.value = data.totalRecords;
    }
  },
  { deep: true }
);

watch(sort, async () => {
  page.value = 1;
  const response = await fetchHomes();
  const data = await fetchHomes();
  if (data) {
    homes.value = data.items;
    totalRecords.value = data.totalRecords;
  }
});

watch(page, async () => {
  const data = await fetchHomes();
  if (data) {
    homes.value = [...homes.value, ...data.items];
  }
});

const handleScroll = () => {
  const sectionRect = homesList.value.getBoundingClientRect();
  const bottomOfSection =
    sectionRect.top + sectionRect.height <= window.innerHeight;

  if (
    totalRecords.value > homes.value.length &&
    bottomOfSection &&
    !loading.value
  ) {
    loadingMore.value = true;
    page.value++;
  }
};

const handleSort = (item) => {
  sort.value = item.value;
  sortText.value = item.abbr;
  sortIcon.value = item.icon;
  showSort.value = false;
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  const data = await fetchHomes();
  if (data) {
    homes.value = data.items;
    totalRecords.value = data.totalRecords;
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function onSortDrawerEnter(el) {
  gsap.from(el, {
    yPercent: 100,
    duration: 0.25,
  });
}

function onSortDrawerLeave(el, done) {
  gsap.to(el, {
    yPercent: 100,
    duration: 0.25,
    onComplete: done,
  });
}
</script>
