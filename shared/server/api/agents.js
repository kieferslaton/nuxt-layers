export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
  
    const response = await fetch(config.public.apiUrl);
    const data = await response.json();

    return data.store.salesTeam;

  });
  