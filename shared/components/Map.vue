<template>
    <div ref="mapContainer" :class="props.classes"
        class="aspect-square overflow-hidden rounded lg:aspect-auto lg:h-full lg:w-full lg:rounded-none">
    </div>
</template>
<script setup>
import customMarker from "~/assets/images/map-marker.png";

const props = defineProps({
    locations: {
        type: Array,
        required: true,
    },
    classes: {
        type: String,
        default: "",
    },
    zoom: {
        type: Number,
        default: null,
    },
})

const locations = computed(() => props.locations);

const map = ref(null);
let markers = [];
const mapContainer = ref(null);

function initMarkers(locations) {
    const bounds = new google.maps.LatLngBounds();
    const paddingOptions = { top: 5, right: 5, bottom: 5, left: 5 };

    markers.forEach(marker => {
        marker.setMap(null)
    });
    markers = [];

    locations.forEach((location) => {
        const position = new google.maps.LatLng(location.latitude, location.longitude);
        const marker = new google.maps.Marker({
            position,
            map: map.value,
            // Customise your marker properties
            icon: {
                url: customMarker,
                scaledSize: new google.maps.Size(24, 37),
            },
        });

        bounds.extend(position);
        markers.push(marker);
    });

    if (!props.zoom) {
        // Fit the map to the new bounds
        map.value.fitBounds(bounds, paddingOptions);
    }
}

const mapCenter = computed(() => {
    if (props.locations && props.locations.length > 0) {
        const totalLat = props.locations.reduce((total, loc) => total + loc.latitude, 0);
        const totalLng = props.locations.reduce((total, loc) => total + loc.longitude, 0);
        return {
            lat: totalLat / props.locations.length,
            lng: totalLng / props.locations.length,
        };
    } else {
        return { lat: 31.327119, lng: -89.290339 }; // Default center
    }
});

onMounted(async () => {
    map.value = new google.maps.Map(mapContainer.value, {
        center: mapCenter.value,
        zoom: 12,
    })
    initMarkers(props.locations);
});

watch(locations, (newLocations) => {
    if (newLocations.length > 0) {
        initMarkers(newLocations);
    }
}, { deep: true });
</script>