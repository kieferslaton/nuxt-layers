export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const query = getQuery(event);

    let queryString = `&page=${query.page}&perPage=1&searchTerm=${query.name}`
    let url = `${config.public.regionalApiUrl}/search?storeId=1${queryString}`

    try { 
        const response = await fetch(url)
        const data = await response.json();

        return data.inventoryItems[0]
    } catch(e) {
        return {
            error: e
        }
    }
})