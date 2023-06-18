export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    console.log(query)
    const response = await fetch(
      `https://regionalhomesbyram.com/umbraco/api/inventorysearch/search?storeId=1&page=${query.page}&perPage=10`
    );
    const data = await response.json();
    console.log(data)
    return { data };
  } catch (error) {
    console.log(error);
    return { error: error.message}
  }
});
