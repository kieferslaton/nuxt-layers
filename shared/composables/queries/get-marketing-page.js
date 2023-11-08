import gql from "graphql-tag";
import { print } from "graphql";

export default async function () {
  const config = useRuntimeConfig();

  const GET_MARKETING_PAGE = gql`
    query getMarketingPage {
      pageBy(uri: "marketing-landing-page") {
        marketingLandingPage {
          hero {
            backgroundImage {
              altText
              sourceUrl
            }
            headline
            subHeading
            videoId
          }
          homeStats {
            stat {
              statDescription
              statHeading
              statNumber
            }
          }
          whyRegional {
            bullets {
              description
              icon
              title
            }
            headline
          }
          homebuyersGuideCopy {
            background {
              sourceUrl
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
      key: "page",
      method: "post",
      body: {
        query: print(GET_MARKETING_PAGE),
      },
      transform(data) {
        return data.data.pageBy.marketingLandingPage;
      },
    }
  );
  return {
    data: data.value,
  };
}
