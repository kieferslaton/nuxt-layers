<template>
  <div class="px-row">
    <Card>
      <video controls crossorigin playsinline ref="video"></video>
      <div class="flex flex-col items-center px-row pb-row">
        <h1 class="mb-3 pt-10 text-4xl">{{ agent.title }}</h1>
        <h5 class="mb-4">Regional Homes of Hattiesburg</h5>
        <a
          v-if="agent.agentFields.agentEmail"
          :href="`mailto:${agent.agentFields.agentEmail}`"
          class="mb-8 text-secondary underline"
          >{{ agent.agentFields.agentEmail }}</a
        >
        <div
          class="mb-10 flex justify-center gap-4"
          v-if="
            agent.agentFields.agentSocial &&
            agent.agentFields.agentSocial.length
          "
        >
          <div
            v-for="item in agent.agentFields.agentSocial"
            class="flex h-10 w-10 rotate-45 items-center justify-center rounded-full border border-gray"
          >
            <SocialIcon class="-rotate-45" :social="item.socialPlatform" />
          </div>
        </div>
        <a
          v-if="agent.agentFields.agentPhone"
          :href="`tel:+1${agent.agentFields.agentPhone}`"
          class="btn btn-secondary btn-full flex items-center"
          ><Icon name="phone" color="white" class="mr-2" size="20" filled />Call
          Me</a
        >
      </div>
    </Card>
    <GoogleMap
      api-key="AIzaSyCrI98GTvPp-yGlhnVKX2sgGeexccPOKAk"
      style="height: 215px; width: 100%"
      class="mb-6 mt-8 overflow-hidden rounded"
      :center="mapCenter"
      :zoom="15"
    >
      <Marker
        :options="{
          position: mapCenter,
          icon: {
            url: customMarker,
            scaledSize: { width: 24, height: 37 },
          },
        }"
      />
    </GoogleMap>
    <div class="flex flex-col">
      <h4 class="mb-2 font-bold">Regional Homes of Hattiesburg</h4>
      <address class="mb-2 not-italic">
        {{
          `${location.locationAddress.streetNumber} ${location.locationAddress.streetName}, ${location.locationAddress.city}, ${location.locationAddress.stateShort} ${location.locationAddress.postCode}`
        }}
      </address>
      <div class="mb-2">
        Office:
        <a class="text-secondary underline" :href="`tel:1+${location.phone}`">{{
          formatPhoneNumber(location.phone)
        }}</a>
      </div>
      <div class="mb-8 flex items-center">
        <Icon name="local_shipping" size="md" filled color="gray-light" />
        <span class="smallcaps ml-4 text-gray-light">{{
          `Delivers to ${location.deliversTo.join(", ")}`
        }}</span>
      </div>
      <a
        class="btn btn-secondary-transparent btn-full mb-4 flex items-center justify-center text-white"
        ><Icon name="check" color="white" size="22" class="mr-3" />Get
        Prequalified</a
      >
      <a
        class="btn btn-gray-light-transparent btn-full mb-12 flex items-center justify-center text-white"
        ><Icon name="search" color="white" size="22" class="mr-3" />Search for
        Homes</a
      >
    </div>
    <Card
      classes="bg-white flex flex-col items-center px-row pt-12 pb-row mb-row2x"
    >
      <div
        v-if="submitted"
        class="mb-row flex w-full flex-col items-center rounded bg-white px-row py-12 text-gray-dark"
      >
        <h2 class="mb-8 text-4xl text-gray-dark">Thank You</h2>
        <p class="mb-12 text-center">
          Thanks for your submission! One of our sales representatives will be
          in touch shortly.
        </p>
      </div>
      <div v-else class="flex w-full flex-col items-center">
        <h2 class="mb-8 text-4xl text-gray-dark">Have Questions?</h2>
        <p class="mx-row2x mb-12 text-center text-gray-dark">
          Fill out this short form and I'll respond in no time!
        </p>
        <form class="w-full">
          <InputText
            id="first-name"
            label="First Name"
            v-model="formData.firstName"
            classes="mb-8"
          />
          <InputText
            id="last-name"
            label="Last Name"
            v-model="formData.lastName"
            classes="mb-8"
          />
          <InputPhone
            id="phone"
            label="Phone"
            v-model="formData.phone"
            classes="mb-12"
          />
          <InputRadio
            label="Preferred Method of Contact"
            :options="[
              {
                label: 'Phone',
                value: 'phone',
              },
              {
                label: 'Text',
                value: 'text',
              },
            ]"
            v-model="formData.contactMethod"
            class="mb-12 px-row"
          />
          <InputTextarea
            id="last-name"
            label="Message"
            v-model="formData.message"
            classes="mb-8"
            :lines="6"
          />
          <button class="btn btn-secondary btn-full" @click.prevent="submit">
            Submit Message
          </button>
        </form>
      </div>
    </Card>
  </div>
</template>
<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { GoogleMap, Marker } from "vue3-google-map";
import Hls from "hls.js";
import customMarker from "~/assets/images/map-marker.png";
const video = ref(null);
const route = useRoute();
const { agent, location } = await getAgent(route.params.name);

const mapCenter = {
  lat: location.locationAddress.latitude,
  lng: location.locationAddress.longitude,
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

const formData = reactive({
  firstName: "",
  lastName: "",
  phone: "",
  contactMethod: "",
  message: "",
});

const rules = reactive({
  firstName: {
    required,
  },
  lastName: {
    required,
  },
  phone: {
    required,
  },
  contactMethod: {
    required,
  },
  message: {
    required,
  },
});

const v$ = useVuelidate(rules, formData);

const submitted = ref(false);

const submit = async () => {
  const result = await v$.value.$validate();
  console.log(result);
  if (!result) {
    return;
  }
  submitted.value = true;
  console.log(formData);
};

onMounted(() => {
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(agent.agentFields.agentVideo);
    hls.attachMedia(video.value);
  }

  console.log(mapCenter);
});
</script>
