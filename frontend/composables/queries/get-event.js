import gql from 'graphql-tag';
import { print } from 'graphql';

export default async function (slug) {
    const config = useRuntimeConfig();

    const GET_EVENT = gql`
    query GetEvent($slug: String!) {
        events(where: {name: $slug}) {
          edges {
            node {
              slug
              startDate
              endDate
              title(format: RENDERED)
              excerpt(format: RENDERED)
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                }
              }
            }
          }
        }
      }
    `
    const response = await $fetch(config.public.wordpressStoreApiUrl, {
        method: 'post',
        body: {
            query: print(GET_EVENT), 
            variables: {
                slug: slug
            }
        }
    });

    const event = response.data.events.edges.map((edge) => edge.node)[0];

    if(event) {

    // Parse the dates
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    // Format eventDate
    const eventDateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    event.eventDate = startDate.toLocaleDateString('en-US', eventDateOptions);

    // Format eventTime
    const formatTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return `${hours}${minutes === '00' ? '' : ':' + minutes}${ampm}`;
    };
    event.eventTime = `${formatTime(startDate)}-${formatTime(endDate)}`;

  }

    // Return the modified event object
    return event;
}