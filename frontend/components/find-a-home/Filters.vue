<template>
  <form
    class="rounded-sm lg:flex lg:flex-row-reverse lg:items-center lg:justify-between lg:bg-primary-lighter lg:px-10 lg:py-8"
  >
    <div class="relative mb-8 w-full lg:mb-0 lg:w-[25vw]">
      <Icon
        name="search"
        size="sm"
        color="gray-dark"
        class="absolute left-4 top-1/2 -translate-y-1/2 transform"
      />
      <input
        class="w-full rounded-full p-4 pl-10 text-base text-black placeholder-black transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary"
        type="text"
        :value="searchTerm"
        @input="updateValue('searchTerm', $event.target.value)"
        placeholder="Search by Model Name or Serial #"
      />
    </div>
    <div class="relative">
      <div class="-mr-row flex overflow-x-scroll lg:overflow-x-auto">
        <button
          class="mr-3 flex items-center rounded-md border border-primary-light px-5 py-2"
          @click.prevent="$emit('filter-change', 'all')"
        >
          <Icon name="tune" size="md" color="secondary" class="mr-3" />
          Filters
        </button>
        <button
          class="mr-3 rounded-md border border-primary-light px-5 py-2"
          :class="
            appliedFilters.includes(filter.value)
              ? 'border-none bg-secondary'
              : ''
          "
          v-for="filter in filters"
          @click.prevent="$emit('filter-change', filter.label)"
        >
          {{ filter.label }}
        </button>
      </div>
      <Transition @enter="onFilterDrawerEnter" @leave="onFilterDrawerLeave">
        <div
          class="fixed bottom-0 left-0 z-40 flex w-screen flex-col items-center rounded-sm bg-white px-row py-row text-gray-dark lg:w-[200%]"
          v-if="activeFilter"
        >
          <h3 class="text-2xl font-bold">Filters</h3>
          <div
            class="mb-4 w-full"
            v-if="activeFilter === 'all' || activeFilter === 'Type'"
          >
            <h5 class="mb-4 font-bold">Type</h5>
            <label
              v-for="item in [
                { value: 1, label: 'New' },
                { value: 2, label: 'Pre-Owned' },
                { value: 3, label: 'Clearance' },
              ]"
              class="flex items-center justify-between border-b border-gray-light py-4"
            >
              {{ item.label }}
              <input
                type="checkbox"
                :value="item.value"
                class="hidden"
                @change="updateValue('condition', item.value)"
              />
              <div
                v-if="condition.includes(item.value)"
                class="flex h-4 w-4 items-center justify-center rounded-sm bg-success"
              >
                <Icon name="check" size="sm" color="white" />
              </div>
              <div
                v-else
                class="flex h-4 w-4 items-center justify-center rounded-sm bg-gray-light"
              ></div>
            </label>
          </div>
          <div
            class="mb-4 w-full"
            v-if="activeFilter === 'all' || activeFilter === 'Size'"
          >
            <h5 class="mb-4 font-bold">Size</h5>
            <div class="flex items-center overflow-x-scroll">
              <button
                v-for="item in [
                  { value: 0, label: 'Any' },
                  { value: 1, label: 'Single' },
                  { value: 2, label: 'Double' },
                ]"
                class="filter-btn"
                :class="{ 'filter-btn-active': localSize === item.value }"
                @click.prevent="updateValue('size', item.value)"
              >
                {{ item.label }}
              </button>
            </div>
          </div>
          <div
            class="mb-4 w-full"
            v-if="activeFilter === 'all' || activeFilter === 'Bed/Bath'"
          >
            <h5 class="mb-4 font-bold">Bed/Bath</h5>
            <div class="flex items-center overflow-x-scroll">
              <button
                v-for="item in [
                  { value: 0, label: 'Any' },
                  { value: 2, label: '2' },
                  { value: 3, label: '3' },
                  { value: 4, label: '4' },
                  { value: 5, label: '5' },
                ]"
                class="filter-btn"
                :class="{ 'filter-btn-active': localBedrooms === item.value }"
                @click.prevent="updateValue('bedrooms', item.value)"
              >
                {{ item.label }}
              </button>
            </div>
          </div>
          <div class="mb-4 mt-6 flex w-full items-center justify-between">
            <a
              href="#"
              @click.prevent="clearFilters"
              class="text-gray-dark underline"
              >Clear All</a
            >
            <button
              @click.prevent="applyFilters"
              :disabled="!filtersChanged"
              :class="
                filtersChanged
                  ? 'btn btn-secondary btn-smallcaps py-4'
                  : 'btn btn-gray-lighter btn-smallcaps py-4'
              "
            >
              Apply Filters
            </button>
          </div>
          <button
            @click.prevent="$emit('filter-change', null)"
            class="absolute right-4 top-4 flex items-center justify-center rounded-full bg-gray-lighter p-2"
          >
            <Icon name="close" size="md" color="gray-dark" />
          </button>
        </div>
      </Transition>
    </div>
  </form>
</template>

<script setup>
import gsap from "gsap";
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
    default: "",
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
});

//These are to store local changes before the filter is applied
const localCondition = ref([...props.condition]);
const localSize = ref(props.size);
const localBedrooms = ref(props.bedrooms);

const filtersChanged = computed(() => {
  return (
    JSON.stringify(localCondition.value) !== JSON.stringify(props.condition) ||
    localSize.value !== props.size ||
    localBedrooms.value !== props.bedrooms
  );
});

const emit = defineEmits([
  "filter-change",
  "update: searchTerm",
  "update:condition",
  "update:size",
  "update:bedrooms",
]);

const updateValue = (name, value) => {
  switch (name) {
    case "condition":
      if (localCondition.value.includes(value)) {
        localCondition.value = localCondition.value.filter(
          (item) => item !== value
        );
      } else {
        localCondition.value.push(value);
      }
      break;
    case "size":
      localSize.value = value;
      break;
    case "bedrooms":
      localBedrooms.value = value;
      break;
    case "searchTerm":
      emit("update:searchTerm", value);
      break;
  }
};

const applyFilters = () => {
  emit("update:condition", localCondition.value);
  emit("update:size", localSize.value);
  emit("update:bedrooms", localBedrooms.value);
  emit("filter-change", null);
};

const clearFilters = () => {
  localBedrooms.value = 0;
  localSize.value = 0;
  localCondition.value = [];
  emit("update:condition", []);
  emit("update:size", 0);
  emit("update:bedrooms", 0);
  emit("filter-change", null);
};

function onFilterDrawerEnter(el) {
  gsap.from(el, {
    yPercent: 100,
    duration: 0.25,
  });
}

function onFilterDrawerLeave(el, done) {
  console.log(el);
  gsap.to(el, {
    yPercent: 100,
    duration: 0.25,
    onComplete: done,
  });
}
</script>
