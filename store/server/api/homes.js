export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);

  const response = await fetch(config.public.regionalApiUrl);
  const data = await response.json();

  let totalRecords = data.store.inventoryItems.length;
  let items = data.store.inventoryItems;

  if (query.searchTerm && query.searchTerm.length > 2) {
    items = items.filter((item) => {
      return item.name.toLowerCase().includes(query.searchTerm.toLowerCase());
    });
  }
  if (query.condition) {
    items = items.filter((item) => {
      return item.homeTypeId === parseInt(query.condition);
    });
  }
  if (query.size) {
    items = items.filter((item) => {
      return item.categoryCode === parseInt(query.size);
    });
  }
  if (query.bedrooms && query.bedrooms != 0) {
    items = items.filter((item) => {
      return item.beds === parseInt(query.bedrooms);
    });
  }

  if (query.sort) {
    switch (query.sort) {
      case "alpha":
        items.sort((a, b) => {
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
        items.sort((a, b) => {
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
        items.sort((a, b) => {
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
        items.sort((a, b) => {
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
        items.sort((a, b) => {
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

  totalRecords = items.length;

  const perPage = query.perPage ? query.perPage : 10;
  //Check for page number and slice accordingly - default to page 1
  const page = query.page ? query.page : 1;
  items = items.slice((page - 1) * perPage, page * perPage);

  return {
    items,
    totalRecords,
    query,
  };
});
