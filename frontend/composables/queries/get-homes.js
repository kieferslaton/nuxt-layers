export default async function (numberHomes = 10, page = 1) {
    const config = useRuntimeConfig();

    try {
        const { data } = await useFetch(
          `${config.public.regionalApiUrl}/search?storeId=1&page=${page}&perPage=${numberHomes}`, 
          {
            transform(data) {
              return data
            }
          }
        );
        console.log(data.value)
        return {
          homes: data.value.inventoryItems, 
          totalHomes: data.value.totalRecords, 
          totalPages: data.value.totalPages
        }
      } catch (error) {
        console.log(error);
        return { error: error.message}
      }
}