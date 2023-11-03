<template>
    <div ref="serviceContainer" class="hidden"></div>
    <div class="relative w-full lg:w-[25vw]">
        <Icon name="search" size="sm" color="gray-dark" class="absolute left-4 top-1/2 -translate-y-1/2 transform" />
        <input ref="autocompleteInput"
            class="w-full rounded-full p-4 pl-10 text-base text-black placeholder-black transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary"
            type="text" placeholder="Search by City or Zip" @focus="initAutocomplete" />
    </div>
</template>
<script setup>
const route = useRoute();
const autocomplete = ref(null);
const autocompleteInput = ref(null);
const serviceContainer = ref(null);

const emit = defineEmits(['update:location']);

function initAutocomplete() {
    if (autocomplete.value || !autocompleteInput.value) return;

    autocomplete.value = new google.maps.places.Autocomplete(autocompleteInput.value, {
        types: ['(regions)'], // Use 'geocode' for addresses, or '(regions)' for broader areas
        componentRestrictions: { country: 'us' },
    });

    autocomplete.value.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
    const place = autocomplete.value.getPlace();
    if (!place.geometry) {
        return;
    }

    emit('update:location', {
        place_id: place.place_id,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
    });
}

onMounted(() => {
    if (route.query.place_id) {
        const service = new google.maps.places.PlacesService(serviceContainer.value);
        service.getDetails({ placeId: route.query.place_id }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(place);
                autocompleteInput.value.value = place.formatted_address; // Set the input field with the place name
                // Optionally emit the place details if needed
                emit('update:location', {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                })
            }
        });
    }
})

</script>