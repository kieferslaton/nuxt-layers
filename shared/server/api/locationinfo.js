export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const response = await fetch(config.public.apiUrl);
  const data = await response.json();

  return {
    name: data.store.storeName,
    address1: data.store.streetAddress1,
    address2: data.store.streetAddress2,
    city: data.store.city,
    state: data.store.state,
    zip: data.store.zipCode,
    email: data.store.email,
    phone: data.store.officePhone,
    deliversTo: data.store.deliveryStates
  };
});
