<template>
    <div class="p-row">
        <Map class="mb-4" :locations="[{ latitude: latLng.lat, longitude: latLng.lng }]" :zoom="10" />
        <div class="mb-6 lg:mb-0">
            <address class="not-italic">
                {{ location.address1 }}<br />{{ location.city }},
                {{ location.state }} {{ location.zip }}
            </address>
            <a href="/" class="text-secondary underline">Get Directions</a>
        </div>
        <div class="rounded bg-white px-row py-10 text-gray-dark">
            <h2 class="text-4xl mb-4">Meet Our Sales Team</h2>
            <div class="flex flex-col">
                <NuxtLink :to="`/agent/${agent.firstName.toLowerCase()}-${agent.lastName.toLowerCase()}`"
                    v-for="agent in agents" class="border border-gray-light flex mb-8 flex-col items-center">
                    <div class="p-row bg-gray-light flex justify-center mb-4 w-full aspect-square">
                        <Icon name="person" size="150" filled color="white" />
                    </div>
                    <h3 class="mb-row text-3xl">{{ agent.firstName + ' ' + agent.lastName }}</h3>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script setup>
const { data: location } = await useFetch(`/api/locationinfo`);
const { data: agents } = await useFetch('/api/agents');
console.log(agents.value);
const apiKey = 'AIzaSyCrI98GTvPp-yGlhnVKX2sgGeexccPOKAk';
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location.value.address1 + ',' + location.value.city + ' ' + location.value.state)}&key=${apiKey}`;

const googleMapsResponse = await fetch(url);
const googleMapsData = await googleMapsResponse.json();

const latLng = googleMapsData.results[0].geometry.location;
</script>