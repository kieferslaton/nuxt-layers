export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  let queryString = `&page=1&perPage=50`;
  let url = `${config.public.regionalApiUrl}/search?storeId=1${queryString}`;
  if (query.searchTerm && query.searchTerm.length > 2) {
    url += `&searchTerm=${query.searchTerm}`;
  }
  if (query.condition) {
    url += `&condition=${
      Array.isArray(query.condition)
        ? query.condition.join(",")
        : query.condition
    }`;
  }
  if (query.size) {
    url += `&size=${query.size}`;
  }
  if (query.bedrooms) {
    url += `&bedrooms=${query.bedrooms}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (query.sort) {
      switch (query.sort) {
        case "alpha":
          data.inventoryItems.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          break;
        case "sqft_asc":
          data.inventoryItems.sort((a, b) => {
            if (a.width * a.length < b.width * b.length) {
              return -1;
            }
            if (a.width * a.length > b.width * b.length) {
              return 1;
            }
            return 0;
          });
          break;
        case "sqft_desc":
          data.inventoryItems.sort((a, b) => {
            if (a.width * a.length > b.width * b.length) {
              return -1;
            }
            if (a.width * a.length < b.width * b.length) {
              return 1;
            }
            return 0;
          });
          break;
        case "beds_asc":
          data.inventoryItems.sort((a, b) => {
            if (a.beds < b.beds) {
              return -1;
            }
            if (a.beds > b.beds) {
              return 1;
            }
            return 0;
          });
          break;
        case "beds_desc":
          data.inventoryItems.sort((a, b) => {
            if (a.beds > b.beds) {
              return -1;
            }
            if (a.beds < b.beds) {
              return 1;
            }
            return 0;
          });
          break;
        default:
          break;
      }
    }

    const perPage = parseInt(query.perPage || "10");
    const startIndex = (parseInt(query.page) - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedData = data.inventoryItems.slice(startIndex, endIndex);

    return {
      data: {
        perPage: perPage,
        startIndex: startIndex,
        endIndex: endIndex,
        inventoryItems: paginatedData,
        totalRecords: data.inventoryItems.length,
      },
    };
  } catch (e) {
    return {
      e,
    };
  }
});
