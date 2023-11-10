import gql from "graphql-tag";
import { print } from "graphql";

export default async function () {
  const config = useRuntimeConfig();

  const GET_ALL_FAQs = gql`
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

  const allFAQsData = await $fetch(config.public.wordpressParentApiUrl, {
    method: "post",
    body: {
      query: print(GET_ALL_FAQs),
    },
  });

  const allFAQs = allFAQsData.data.pages.edges[0].node.faq.faqs;

  const GET_STORE_FAQS = gql`
    {
      pages(where: { name: "faqs" }) {
        edges {
          node {
            availableFaqs {
              locationFaqs
            }
          }
        }
      }
    }
  `;

  const storeFAQsData = await $fetch(config.public.wordpressStoreApiUrl, {
    method: "post",
    body: {
      query: print(GET_STORE_FAQS),
    },
  });

  const storeFAQs =
    storeFAQsData.data.pages.edges[0].node.availableFaqs.locationFaqs;

  console.log(storeFAQs);

  return allFAQs.filter((faq) => storeFAQs.includes(faq.question));
}
