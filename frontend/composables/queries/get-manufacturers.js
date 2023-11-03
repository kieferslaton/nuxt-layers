import gql from "graphql-tag";
import { print } from "graphql";

export default async function () {
  const config = useRuntimeConfig();

  const GET_MANUFACTURERS = gql`
  query GetManufacturers {
    manufacturers {
      edges {
        node {
          content(format: RENDERED)
          title(format: RENDERED)
          featuredImage {
            node {
              sourceUrl(size: LARGE)
            }
          }
          manufacturers {
            id
          }
        }
      }
    }
  }
  `;

  //Fetch services from store api
  const manufacturerData = await $fetch(config.public.wordpressParentApiUrl, {
    method: "post",
    body: {
      query: print(GET_MANUFACTURERS),
    }
  });

  var availableServices = manufacturerData.data.manufacturers.edges.map((edge) => edge.node);

  const storeData = await $fetch(config.public.regionalApiUrl);

  if (storeData) {
    availableServices = availableServices.filter((service) => {
      return storeData.store.manufacturers.some((manufacturer) => {
        return manufacturer.manufacturerId === service.manufacturers.id;
      });
    });
  }

  return availableServices;
}
