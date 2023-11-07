import gql from "graphql-tag";
import { print } from "graphql";

export default async function () {
  const config = useRuntimeConfig();

  const GET_SERVICES = gql`
    query {
      pages(where: { name: "services" }) {
        edges {
          node {
            id
            availableServices {
              locationServices
            }
          }
        }
      }
    }
  `;

  //Fetch services from store api
  const serviceIds = await $fetch(config.public.wordpressStoreApiUrl, {
    method: "post",
    body: {
      query: print(GET_SERVICES),
    }
  });

  var availableServices = serviceIds.data.pages.edges[0].node.availableServices.locationServices.map(id => parseInt(id));

  var GET_SERVICES_BY_ID = gql`
  query GetServicesById($ids: [ID!]) {
    services(where: {in: $ids}) {
      edges {
        node {
          id
          title(format: RENDERED)
          servicesFields {
            icon
            description
          }
        }
      }
    }
  }
`;

  const services = await $fetch(config.public.wordpressParentApiUrl, {
    method: "post",
    body: {
      query: print(GET_SERVICES_BY_ID),
      variables: {
        ids: availableServices
      }
    }
  });

  return services.data.services.edges.map((edge) => edge.node);
}
