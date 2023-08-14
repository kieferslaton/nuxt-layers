import gql from "graphql-tag";
import { print } from "graphql";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  let numberPosts = query.numberPosts;
  let after = query.after;

  const GET_POSTS = gql`
      query PostsQuery {
          posts(first: ${numberPosts}${after ? `, after: "${after}"` : ""}) {
            edges {
              cursor
              node {
                title(format: RENDERED)
                content(format: RAW)
                date
                slug
                featuredImage {
                  node {
                    altText
                    sourceUrl(size: LARGE)
                  }
                }
                categories {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
        }
        `;

  try {
    const { data, refresh, pending, error } = await useFetch(
      config.public.wordpressParentApiUrl,
      {
        key: "posts",
        method: "post",
        body: {
          query: print(GET_POSTS),
        },
        transform(data) {
          return {
            posts:
              numberPosts === 1
                ? data.data.posts.edges.map((edge) => edge.node)[0]
                : data.data.posts.edges.map((edge) => edge.node),
            cursor: data.data.posts.edges.map((edge) => edge.cursor)[0],
          };
        },
      }
    );

    return data.value;
  } catch (error) {
    console.error(error);
  }
});
