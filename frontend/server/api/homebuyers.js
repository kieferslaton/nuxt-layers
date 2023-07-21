import gql from "graphql-tag";
import { print } from "graphql";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  let id = query.id;

  const GET_HOMEBUYERS_CONTENT = gql`
    query HomebuyersContent {
      page(id: "cG9zdDo4") {
        id
        title(format: RENDERED)
        uri
        content(format: RAW)
        hombuyersGuideSteps {
          steps {
            header
            content
          }
        }
      }
    }
  `;

  try {
    const { data, refresh, pending, error } = await useFetch(
      config.public.wordpressParentApiUrl,
      {
        method: "get",
        query: {
          query: print(GET_HOMEBUYERS_CONTENT),
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
});
