import gql from "graphql-tag";
import { print } from "graphql";

export default async function (menuName = "Main Navigation", source = "store") {
  const config = useRuntimeConfig();

  const GET_MENU = gql`
    query getMenu {
      menus {
        edges {
          node {
            id
            name
            menuItems(where: { parentId: "0" }) {
              edges {
                node {
                  label
                  uri
                  childItems {
                    edges {
                      node {
                        label
                        uri
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const { data, refresh, pending, error } = await useFetch(
    source === "store"
      ? config.public.wordpressStoreApiUrl
      : config.public.wordpressParentApiUrl,
    {
      key: menuName,
      method: "post",
      body: {
        query: print(GET_MENU),
      },
      transform(data) {
        console.log(menuName);

        //Return only the menu whose name matches the menuName parameter
        return data.data.menus.edges.filter(
          (menu) => menu.node.name === menuName
        )[0].node.menuItems.edges;
      },
    }
  );

  return {
    data,
  };
}
