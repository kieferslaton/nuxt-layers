export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  let hasSearch = false;
  let lat, lng;

  if (query && query.lat && query.lng) {
    lat = query.lat;
    lng = query.lng;
    hasSearch = true;
  }

  const response = await fetch(process.env.MASTER_URL);
  const data = await response.json();

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  async function fetchStoreData(store) {
    const response = await fetch(store.dataUrl);
    const data = await response.json();

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      data.store.streetAddress1 + "," + data.store.city + " " + data.store.state
    )}&key=${apiKey}`;

    const googleMapsResponse = await fetch(url);
    const googleMapsData = await googleMapsResponse.json();

    const location = googleMapsData.results[0].geometry.location;

    let distance = hasSearch
      ? getDistanceFromLatLonInKm(lat, lng, location.lat, location.lng)
      : null;

    return {
      city: data.store.city,
      state: data.store.state,
      phone: data.store.officePhone,
      name: data.store.storeName,
      zip: data.store.zip,
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lng),
      distance: distance,
    };
  }

  let locations = await Promise.all(
    data.companies[0].stores.map(fetchStoreData)
  );

  if (hasSearch) {
    locations = locations.sort((a, b) => a.distance - b.distance).slice(0, 5);
  }

  return locations;
});
