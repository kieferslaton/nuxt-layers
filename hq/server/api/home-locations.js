export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  async function fetchStoreData(store) {
    const response = await fetch(store.dataUrl);
    const data = await response.json();

    const apiKey = "AIzaSyCrI98GTvPp-yGlhnVKX2sgGeexccPOKAk";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      data.store.streetAddress1 + "," + data.store.city + " " + data.store.state
    )}&key=${apiKey}`;

    const googleMapsResponse = await fetch(url);
    const googleMapsData = await googleMapsResponse.json();

    const location = googleMapsData.results[0].geometry.location;

    if (
      data.store.inventoryItems.find((item) => {
        return item.name?.toLowerCase().replace(" ", "-") === query.name;
      })
    ) {
      return {
        city: data.store.city,
        state: data.store.state,
        phone: data.store.officePhone,
        name: data.store.storeName,
        zip: data.store.zip,
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lng),
        inventoryItems: data.store.inventoryItems,
      };
    }

    return false;
  }
  const locations = [];
  const response = await fetch(
    "https://media.regionalhomes.net/regent-public/company-master.json"
  );
  const data = await response.json();
  for (let i = 0; i < data.companies[0].stores.length; i++) {
    const storeRes = await fetchStoreData(data.companies[0].stores[i]);
    console.log(storeRes);
    if (storeRes) {
      locations.push(storeRes);
    }
  }
  return locations;
});
