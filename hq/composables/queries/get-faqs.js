import gql from "graphql-tag";
import { print } from "graphql";

export default async function () {
  const config = useRuntimeConfig();

  const GET_FAQs = gql`
    query {
      pages(where: { name: "faqs" }) {
        edges {
          node {
            faq {
              faqs {
                question
                answer
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
      key: "faqs",
      method: "post",
      body: {
        query: print(GET_FAQs),
      },
      transform(data) {
        return data.data.pages.edges.map((edge) => edge.node)[0];
      },
    }
  );

  console.log(data.value.faq.faqs);

  return data.value.faq.faqs;
}
