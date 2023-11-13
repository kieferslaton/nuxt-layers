export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const response = await fetch(config.public.apiUrl);
  const data = await response.json();

  const agent = data.store.salesTeam.find((item) => {
    return (
      `${item.firstName.toLowerCase()}-${item.lastName.toLowerCase()}` ===
      query.name
    );
  });

  return agent;
});
