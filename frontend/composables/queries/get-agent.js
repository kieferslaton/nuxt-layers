import gql from "graphql-tag";
import { print } from "graphql";

export default async function (name) {
  const config = useRuntimeConfig();

  const GET_AGENT = gql`
        query {
            agents(where: { name: "${name}" }) {
                edges {
                    node {
                        uri
                        title(format: RENDERED)
                        agentFields {
                          agentEmail
                          agentPhone
                          agentVideo
                          agentSocial {
                            socialLink
                            socialPlatform
                          }
                        }
                        link
                        slug
                      
                    }
                }
            }
            locationOptions {
                locationFields {
                    deliversTo
                    phone
                    locationAddress {
                        city
                        postCode
                        stateShort
                        streetName
                        streetNumber
                        latitude
                        longitude
                      }
                }
            }
        }`;

  const { data, refresh, pending, error } = await useFetch(
    config.public.wordpressParentApiUrl,
    {
      key: name,
      method: "post",
      body: {
        query: print(GET_AGENT),
      },
      transform(data) {
        return {
          agent: data.data.agents.edges.map((edge) => edge.node)[0],
          location: data.data.locationOptions.locationFields,
        };
      },
    }
  );

  return data.value;
}
