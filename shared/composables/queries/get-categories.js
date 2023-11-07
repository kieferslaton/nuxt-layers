import gql from "graphql-tag";
import { print } from "graphql";

export default async function () {
  const config = useRuntimeConfig();

  const GET_CATEGORIES = gql`
    query CategoriesQuery {
      categories {
        edges {
          node {
            name
            id
          }
        }
      }
    }
  `;

  const { data, refresh, pending, error } = await useFetch(
    config.public.wordpressParentApiUrl,
    {
      key: "posts",
      method: "post",
      body: {
        query: print(GET_CATEGORIES),
      },
      transform(data) {
        return data.data.categories.edges.map((edge) => edge.node);
      },
    }
  );

  return data.value;
}
