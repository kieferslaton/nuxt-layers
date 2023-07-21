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
            services {
              services {
                icon
                title
                description
              }
            }
          }
        }
      }
    }
  `;

  const { data, refresh, pending, error } = await useFetch(
    config.public.wordpressParentApiUrl,
    {
      key: "services",
      method: "post",
      body: {
        query: print(GET_SERVICES),
      },
      transform(data) {
        return data.data.pages.edges.map((edge) => edge.node)[0];
      },
    }
  );

  return data.value.services.services;
}
