import gql from "graphql-tag";
import { print } from "graphql";

export default async function (uri) {
  const config = useRuntimeConfig();

  const GET_HOMEBUYERS_CONTENT = gql`
    query HomebuyersContent($uri: String!) {
      pages(where: { name: $uri }) {
        edges {
          node {
            id
            title(format: RENDERED)
            uri
            content(format: RENDERED)
            homebuyersGuideSteps {
              steps {
                header
                content
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
      key: uri,
      method: "post",
      body: {
        query: print(GET_HOMEBUYERS_CONTENT),
        variables: {
          uri: uri,
        },
      },
      transform(data) {
        return data.data.pages.edges.map((edge) => edge.node)[0];
      },
    }
  );

  console.log(data);

  return {
    title: data.value.title,
    content: data.value.content,
    steps: data.value.homebuyersGuideSteps.steps,
  };
}
