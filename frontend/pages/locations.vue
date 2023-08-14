<template>
  <div class="border-t border-primary-lighter pb-4 pl-row pt-6">
    <Breadcrumb />
  </div>
  <GoogleMap
    api-key="AIzaSyCrI98GTvPp-yGlhnVKX2sgGeexccPOKAk"
    style="width: 100%"
    class="mb-6 aspect-square overflow-hidden rounded"
    :center="mapCenter"
    :zoom="7"
  >
    <Marker
      v-for="location in locations"
      :options="{
        position: {
          lat: location.latitude,
          lng: location.longitude,
        },
        icon: {
          url: customMarker,
          scaledSize: { width: 24, height: 37 },
        },
      }"
    >
      <InfoWindow>
        <div class="text-gray-dark">
          <h3 class="mb-2 text-base">{{ location.name }}</h3>
          <a
            :href="location.locationUrl"
            target="_blank"
            class="mb-2 block underline"
            >{{ location.locationUrl }}</a
          >
          <a :href="`tel:${location.phoneNumber}`" class="mb-2 block">{{
            location.phoneNumber
          }}</a>
          <a
            class="block underline"
            :href="createDirectionsLink(location)"
            target="_blank"
            >Get Directions</a
          >
        </div>
      </InfoWindow>
    </Marker>
  </GoogleMap>
  <div class="px-row py-4">
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
        v-model="searchTerm"
        placeholder="Search by City or Zip"
      />
    </div>
  </div>
  <span class="smallcaps mx-row mb-4 text-gray-light"
    >{{ locations.length }} Results</span
  >
  <div
    class="border-b border-primary-lighter px-row py-8"
    v-for="city in locationsGroupedByCity"
    :key="city.name"
  >
    <h4 class="mb-4 font-bold">{{ city.name }}</h4>
    <div
      class="mb-4 flex w-full justify-between"
      v-for="location in city.locations"
      :key="location.name"
    >
      <a
        :href="location.locationUrl"
        target="_blank"
        class="flex max-w-[60%] items-center"
        ><span
          class="flex-grow overflow-hidden text-ellipsis whitespace-nowrap"
          >{{ location.name }}</span
        >
        <Icon color="secondary" name="open_in_browser" class="ml-2" size="16"
      /></a>
      <div class="flex gap-2">
        <a
          :href="createDirectionsLink(location)"
          class="flex h-8 w-8 items-center justify-center rounded-full border border-secondary"
        >
          <Icon name="location_on" size="14" filled />
        </a>
        <a
          :href="`tel:${location.phone}`"
          class="flex h-8 w-8 items-center justify-center rounded-full border border-secondary"
        >
          <Icon name="phone" size="14" filled />
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";
import customMarker from "~/assets/images/map-marker.png";

const searchTerm = ref("");
const { data: locations, pending } = await useFetch("/api/locations", {
  query: { searchTerm },
  watch: [searchTerm],
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

const mapCenter = computed(() => {
  if (locations && locations.length > 0) {
    const totalLat = locations.reduce((total, loc) => total + loc.latitude, 0);
    const totalLng = locations.reduce((total, loc) => total + loc.longitude, 0);
    return {
      lat: totalLat / locations.length,
      lng: totalLng / locations.length,
    };
  } else {
    return { lat: 31.327119, lng: -89.290339 }; // Default center
  }
});

function createDirectionsLink(destination) {
  const destinationCoords = `${destination.latitude},${destination.longitude}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${destinationCoords}`;
}
</script>
