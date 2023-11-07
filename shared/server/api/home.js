export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const query = getQuery(event);
  
    const response = await fetch(config.public.regionalApiUrl);
    const data = await response.json();
  
    const home = data.store.inventoryItems.find((item) => {
      return item.name.toLowerCase().replace(" ", "-") === query.name;
    });
  
    return home;
  });
  