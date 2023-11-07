import gql from "graphql-tag";
import { print } from "graphql";

export default async function (uri) {
  const config = useRuntimeConfig();

  const GET_PAGE = gql`
    query QueryPageByUri($uri: String!) {
      nodeByUri(uri: $uri) {
        id
        ... on Page {
          title(format: RENDERED)
          content(format: RENDERED)
        }
      }
    }
  `;

  const { data } = await useFetch(config.public.wordpressParentApiUrl, {
    key: uri,
    method: "post",
    body: {
      query: print(GET_PAGE),
      variables: {
        uri: uri,
      },
    },
    transform(data) {
      return data.data.nodeByUri;
    },
  });

  return {
    title: data.value.title,
    content: data.value.content,
  };
}
