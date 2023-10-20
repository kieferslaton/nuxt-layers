export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const query = getQuery(event);

    const response = await fetch('https://media.regionalhomes.net/regent-public/company-master.json');
    const data = await response.json();

    async function fetchStoreData(store){
        const response = await fetch(store.dataUrl);
        const data = await response.json();

        const apiKey = 'AIzaSyCrI98GTvPp-yGlhnVKX2sgGeexccPOKAk';
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(data.store.streetAddress1 + ',' + data.store.city + ' ' + data.store.state)}&key=${apiKey}`;

        const googleMapsResponse = await fetch(url);
        const googleMapsData = await googleMapsResponse.json();

        const location = googleMapsData.results[0].geometry.location;

        return {
            city: data.store.city,
            state: data.store.state,
            phone: data.store.officePhone,
            name: data.store.storeName,
            latitude: parseFloat(location.lat),
            longitude: parseFloat(location.lng)
        }
    }

    const locations = await Promise.all(data.companies[0].stores.map(fetchStoreData));

    console.log(locations[0]);

    return locations;
});

