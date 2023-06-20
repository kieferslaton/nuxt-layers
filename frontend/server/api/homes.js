export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  let queryString = `&page=${query.page}&perPage=${query.perPage || '10'}`
  let url = `${config.public.regionalApiUrl}/search?storeId=1${queryString}`
  if(query.searchTerm && query.searchTerm.length > 2) {
    url += `&searchTerm=${query.searchTerm}`
  }
  if(query.condition) {
    url += `&condition=${Array.isArray(query.condition) ? query.condition.join(',') : query.condition}`
  }
  if(query.size) {
    url += `&size=${query.size}`
  }
  if(query.bedrooms) {
    url += `&bedrooms=${query.bedrooms}`
  }

  try {
    const response = await fetch(url)
    const data = await response.json();
    return {
      data
    }
  } catch(e) {
    return {
    error: e
    }
  }
});
