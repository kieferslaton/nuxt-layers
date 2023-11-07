import gql from "graphql-tag";
import { print } from "graphql";

export default async function () {
  const config = useRuntimeConfig();

  const GET_TESTIMONIAL = gql`
    query getTestimonial {
      testimonials {
        edges {
          node {
            content(format: RENDERED)
            title
            featuredImage {
              node {
                sourceUrl(size: LARGE)
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
      key: "testimonial",
      method: "post",
      body: {
        query: print(GET_TESTIMONIAL),
      },
      transform(data) {
        //Return a random single testimonial from the list
        const randomTestimonial = Math.floor(
          Math.random() * data.data.testimonials.edges.length
        );
        return data.data.testimonials.edges[randomTestimonial].node;
      },
    }
  );

  return {
    data,
  };
}
