<template>
  <section class="px-row lg:px-row2x py-row border-t-primary-lighter border-t">
    <h1 class="mb-6">Contact</h1>
    <div class="flex flex-col gap-8 lg:flex-row">
      <div class="lg:w-1/2 lg:pr-[2.5vw]">
        <div class="relative aspect-video">
          <Map
            :locations="[{ latitude: latLng.lat, longitude: latLng.lng }]"
            :zoom="10"
          />
        </div>
      </div>
      <div class="lg:w-1/2 lg:pl-[2.5vw]">
        <div class="flex flex-col">
          <h3 class="mb-2 text-2xl font-bold">{{ location.name }}</h3>
          <address class="not-italic">
            {{ location.address1 }}<br />
            {{ `${location.city}, ${location.state} ${location.zip}` }}
          </address>
          <span>
            Office:
            <a
              class="text-secondary underline"
              :href="`tel:1+${location.phone}`"
              >{{ location.phone }}</a
            >
          </span>
          <div class="mt-6 flex items-center" v-if="location.deliversTo">
            <Icon name="local_shipping" size="md" filled color="gray-light" />
            <span class="smallcaps text-gray-light ml-4">{{
              `Delivers to ${location.deliversTo.join(", ")}`
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="px-row py-row lg:px-row2x border-t-primary-lighter border-t">
    <h2 class="mb-8">Meet Our Sales Team</h2>
    <div class="d:grid-cols-3 dl:grid-cols-4 grid gap-8 sm:grid-cols-2">
      <NuxtLink
        :to="`/agent/${agent.firstName.toLowerCase()}-${agent.lastName.toLowerCase()}`"
        v-for="agent in agents"
        class="bg-primary-light flex flex-col rounded-sm text-center"
      >
        <Card>
          <video
            controls
            crossorigin
            playsinline
            ref="video"
            v-if="agent.video"
          ></video>

          <div
            v-else
            class="p-row bg-gray-light mb-4 flex aspect-video w-full justify-center"
          >
            <Icon name="person" size="150" filled color="white" />
          </div>
          <div class="flex flex-col items-center px-6 pb-6">
            <h1 class="mb-3 pt-10 text-4xl">
              {{ agent.firstName + " " + agent.lastName }}
            </h1>
            <h5 class="mb-4">{{ location.name }}</h5>
            <a
              v-if="agent.email"
              :href="`mailto:${agent.email}`"
              class="text-secondary mb-8 underline"
              >{{ agent.email }}</a
            >
            <div
              class="mb-10 flex justify-center gap-4"
              v-if="agent.socialMedia && agent.socialMedia.length"
            >
              <a
                v-for="item in agent.socialMedia"
                :href="item.url"
                :key="item.sequence"
                class="border-primary-lighter flex h-10 w-10 rotate-45 items-center justify-center rounded-full border"
              >
                <SocialIcon class="-rotate-45" :social="item.type" />
              </a>
            </div>
            <a
              v-if="agent.mobilePhone"
              :href="`tel:+1${agent.mobilePhone}`"
              class="btn btn-secondary btn-full flex items-center"
            >
              <Icon
                name="phone"
                color="white"
                class="mr-2"
                size="20"
                filled
              />Call Me
            </a>
          </div>
        </Card>
      </NuxtLink>
    </div>
  </section>
</template>
<script setup>
const { data: location } = await useFetch(`/api/locationinfo`);
const { data: agents } = await useFetch("/api/agents");
console.log(agents.value);
const apiKey = "AIzaSyCrI98GTvPp-yGlhnVKX2sgGeexccPOKAk";
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  location.value.address1 +
    "," +
    location.value.city +
    " " +
    location.value.state
)}&key=${apiKey}`;

const googleMapsResponse = await fetch(url);
const googleMapsData = await googleMapsResponse.json();

const latLng = googleMapsData.results[0].geometry.location;
</script>
