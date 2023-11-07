<template>
  <div class="border-t border-primary-lighter pb-4 pl-row pt-6 lg:pb-0 lg:pt-0">
    <Breadcrumb />
  </div>
  <div class="flex flex-col border-b border-primary-lighter lg:h-[calc(100vh-150px)] lg:flex-row">
    <div class="w-full lg:h-full lg:w-1/2">
      <Map :locations="locations" />
    </div>
    <div class="w-full lg:h-full lg:w-1/2 lg:overflow-scroll">
      <div class="relative top-0 bg-primary px-row py-6 lg:sticky">
        <LocationsAutocomplete @update:location="handleLocationUpdate" />
      </div>
      <span class="smallcaps mt-4 px-row text-gray-light">{{ locations.length }} Results</span>
      <div class="border-b border-primary-lighter px-row py-8 last-of-type:border-none"
        v-for="city in locationsGroupedByCity" :key="city.name">
        <h4 class="mb-4 font-bold">{{ city.name }}</h4>
        <div class="mb-4 flex w-full justify-between" v-for="location in city.locations" :key="location.name">
          <a :href="location.locationUrl" target="_blank" class="flex max-w-[60%] items-center"><span
              class="flex-grow overflow-hidden text-ellipsis whitespace-nowrap">{{ location.name }}</span>
            <Icon color="secondary" name="open_in_browser" class="ml-2" size="16" />
          </a>
          <div class="flex gap-2">
            <a :href="createDirectionsLink(location)"
              class="flex h-8 w-8 items-center justify-center rounded-full border border-secondary">
              <Icon name="location_on" size="14" filled />
            </a>
            <a :href="`tel:${location.phone}`"
              class="flex h-8 w-8 items-center justify-center rounded-full border border-secondary">
              <Icon name="phone" size="14" filled />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";


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
