<template>
  <div class="px-row">
    <Card>
      <video controls crossorigin playsinline ref="video" v-if="agent.video"></video>
      <div class="flex flex-col items-center px-row pb-row">
        <h1 class="mb-3 pt-10 text-4xl">
          {{ agent.firstName + " " + agent.lastName }}
        </h1>
        <h5 class="mb-4">{{ location.name }}</h5>
        <a v-if="agent.email" :href="`mailto:${agent.email}`" class="mb-8 text-secondary underline">{{ agent.email }}</a>
        <div class="mb-10 flex justify-center gap-4" v-if="agent.socialMedia && agent.socialMedia.length">
          <a v-for="item in agent.socialMedia" :href="item.url" :key="item.sequence"
            class="flex h-10 w-10 rotate-45 items-center justify-center rounded-full border border-gray">
            <SocialIcon class="-rotate-45" :social="item.type" />
          </a>
        </div>
        <a v-if="agent.mobilePhone" :href="`tel:+1${agent.mobilePhone}`"
          class="btn btn-secondary btn-full flex items-center">
          <Icon name="phone" color="white" class="mr-2" size="20" filled />Call
          Me
        </a>
      </div>
    </Card>
    <GoogleMap api-key="AIzaSyCrI98GTvPp-yGlhnVKX2sgGeexccPOKAk" style="height: 215px; width: 100%"
      class="mb-6 mt-8 overflow-hidden rounded" :center="mapCenter" :zoom="15">
      <Marker :options="{
        position: mapCenter,
        icon: {
          url: customMarker,
          scaledSize: { width: 24, height: 37 },
        },
      }" />
    </GoogleMap>
    <div class="flex flex-col">
      <h4 class="mb-2 font-bold">{{ location.name }}</h4>
      <address class="mb-2 not-italic">
        {{
          `${location.address1}, ${location.city}, ${location.state} ${location.zip}`
        }}
      </address>
      <div :class="`${location.deliversTo ? 'mb-2' : 'mb-8'}`">
        Office:
        <a class="text-secondary underline" :href="`tel:1+${location.phone}`">{{
          formatPhone(location.phone)
        }}</a>
      </div>
      <div class="mb-8 flex items-center" v-if="location.deliversTo">
        <Icon name="local_shipping" size="md" filled color="gray-light" />
        <span class="smallcaps ml-4 text-gray-light">{{
          `Delivers to ${location.deliversTo.join(", ")}`
        }}</span>
      </div>
      <NuxtLink :to="{
            name: 'prequalify', query: {
              salespersonId: agent.salespersonId,
            }
          }" class="btn btn-secondary-transparent btn-full mb-4 flex items-center justify-center text-white">
        <Icon name="check" color="white" size="22" class="mr-3" />Get
        Prequalified
      </NuxtLink>
      <a class="btn btn-gray-light-transparent btn-full mb-12 flex items-center justify-center text-white">
        <Icon name="search" color="white" size="22" class="mr-3" />Search for
        Homes
      </a>
    </div>
    <ContactForm />
  </div>
</template>
<script setup>
import { GoogleMap, Marker } from "vue3-google-map";
import Hls from "hls.js";
import customMarker from "~/assets/images/map-marker.png";

const getLatLng = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results[0]) {
      lat.value = data.results[0].geometry.location.lat;
      lng.value = data.results[0].geometry.location.lng;
    } else {
      console.log("No results found");
    }
  } catch (error) {
    console.error("An error occurred", error);
  }
};

const video = ref(null);
const lat = ref(null);
const lng = ref(null);
const route = useRoute();
const { data: agent } = await useFetch(`/api/agent?name=${route.params.name}`);
const { data: location } = await useFetch(`/api/locationinfo`);
await getLatLng(
  `${location.value.address1}, ${location.value.city}, ${location.value.state} ${location.value.zip}`
);

const mapCenter = {
  lat: lat.value,
  lng: lng.value,
};

function formatPhoneNumber(number) {
  return (
    "(" +
    number.substring(0, 3) +
    ") " +
    number.substring(3, 6) +
    "-" +
    number.substring(6)
  );
}

onMounted(() => {
  if (Hls.isSupported() && agent.value.video) {
    var hls = new Hls();
    hls.loadSource(agent.agentFields.agentVideo);
    hls.attachMedia(video.value);
  }
});
</script>
