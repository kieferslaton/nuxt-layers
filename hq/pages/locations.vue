<template>
  <div class="border-primary-lighter pl-row border-t pb-4 pt-6 lg:pb-0 lg:pt-0">
    <Breadcrumb />
  </div>
  <div class="border-primary-lighter flex flex-col border-b lg:h-[calc(100vh-150px)] lg:flex-row">
    <div class="relative aspect-square w-full lg:h-full lg:w-1/2">
      <Map :locations="locations" />
    </div>
    <div class="w-full lg:h-full lg:w-1/2 lg:overflow-scroll">
      <div class="bg-primary px-row relative top-0 py-6 lg:sticky">
        <LocationsAutocomplete @update:location="handleLocationUpdate" />
      </div>
      <span class="smallcaps px-row text-gray-light mt-4">{{ locations.length }} Results</span>
      <div class="border-primary-lighter px-row border-b py-8 last-of-type:border-none"
        v-for="city in locationsGroupedByCity" :key="city.name">
        <h4 class="mb-4 font-bold">{{ city.name }}</h4>
        <div class="mb-4 flex w-full justify-between" v-for="location in city.locations" :key="location.name">
          <a :href="location.locationUrl" target="_blank" class="flex max-w-[60%] items-center"><span
              class="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">{{ location.name }}</span>
            <Icon color="secondary" name="open_in_browser" class="ml-2" size="16" />
          </a>
          <div class="flex gap-2">
            <a :href="createDirectionsLink(location)"
              class="border-secondary flex h-8 w-8 items-center justify-center rounded-full border">
              <Icon name="location_on" size="14" filled />
            </a>
            <a :href="`tel:${location.phone}`"
              class="border-secondary flex h-8 w-8 items-center justify-center rounded-full border">
              <Icon name="phone" size="14" filled />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const lat = ref(null);
const lng = ref(null);

const { data: locations, pending } = await useFetch("/api/locations", {
  query: { lat, lng },
  watch: [lat, lng],
});

const locationsGroupedByCity = computed(() => {
  const cities = [];

  locations.value.forEach((location) => {
    const city = cities.find(
      (city) => city.name === location.city + ", " + location.state
    );

    if (city) {
      city.locations.push(location);
    } else {
      cities.push({
        name: location.city + ", " + location.state,
        locations: [location],
      });
    }
  });

  return cities;
});

function createDirectionsLink(destination) {
  const destinationCoords = `${destination.latitude},${destination.longitude}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${destinationCoords}`;
}

function handleLocationUpdate(location) {
  lat.value = location.lat;
  lng.value = location.lng;
}
</script>
