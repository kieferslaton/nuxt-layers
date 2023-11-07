import gql from "graphql-tag";
import { print } from "graphql";

export default async function () {
  const config = useRuntimeConfig();

  const GET_HOME = gql`
    query getHome {
      pageBy(uri: "home") {
        id
        featuredImage {
          node {
            altText
            sourceUrl(size: _2048X2048)
          }
        }
        homepage {
          heroHeadline {
            normal
            script
            subheader
          }
          mission {
            header
            subheader
          }
          homebuyersGuide {
            background {
              sourceUrl(size: _2048X2048)
            }
            subheader
          }
        }
      }
    }
  `;

  const { data, refresh, pending, error } = await useFetch(
    config.public.wordpressParentApiUrl,
    {
      key: "home",
      method: "post",
      body: {
        query: print(GET_HOME),
      },
      transform(data) {
        return data.data.pageBy;
      },
    }
  );

  return {
    data,
  };
}
