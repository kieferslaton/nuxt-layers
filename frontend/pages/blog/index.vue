<template>
  <div class="border-t border-primary-lighter pb-4 pl-row pt-6">
    <Breadcrumb />
  </div>
  <!--Featured Post-->
  <div
    class="post flex flex-col border-b border-primary-lighter px-row pb-20 tl:flex-row tl:gap-8 lg:px-row2x"
  >
    <img
      :src="recentPost.featuredImage?.node?.sourceUrl"
      :alt="recentPost.featuredImage?.node?.altText"
      class="mb-6 w-full rounded-sm tl:w-1/2"
    />
    <div
      class="flex w-full max-w-sm flex-col justify-center tl:-mt-12 tl:w-1/2"
    >
      <div class="mb-6 flex text-[0.85rem]">
        <a href="/" class="text-white underline">{{
          recentPost.categories?.edges[0].node?.name
        }}</a>
        <span class="mx-2 text-white">|</span>
        <span>{{
          recentPost.date
            ? Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date(recentPost.date))
            : ""
        }}</span>
      </div>
      <h2 class="mb-8 text-4xl">{{ recentPost.title }}</h2>
      <a
        class="btn btn-transparent self-start"
        :href="`/blog/${recentPost.slug}`"
        >Continue Reading</a
      >
    </div>
  </div>
  <!--End Featured Post-->
  <div class="px-row pb-20 pt-10 lg:px-row2x">
    <div
      class="no-scrollbar -mr-row mb-8 flex overflow-x-scroll lg:overflow-x-auto"
    >
      <button
        class="mr-3 flex items-center rounded-md border border-primary-light px-5 py-2"
        :class="selectedCategory === '' ? 'border-none bg-secondary' : ''"
        @click="filterPosts('')"
      >
        All
      </button>
      <button
        class="mr-3 rounded-md border border-primary-light px-5 py-2"
        :class="
          category.name === selectedCategory ? 'border-none bg-secondary' : ''
        "
        v-for="category in categories"
        :index="category.name"
        @click="filterPosts(category.name)"
      >
        {{ category.name }}
      </button>
    </div>
    <!-- Posts Grid -->
    <div
      class="posts__grid grid grid-cols-1 gap-8 tp:grid-cols-2 d:grid-cols-3"
    >
      <div
        v-for="post in displayedPosts"
        :index="post.slug"
        class="posts__grid-item overflow-hidden rounded bg-primary-light"
      >
        <img
          v-if="post.featuredImage"
          :src="post.featuredImage.node.sourceUrl"
          :alt="post.featuredImage.node.altText"
          class="aspect-auto w-full"
        />
        <div class="px-row py-6 tp:px-8">
          <h3 class="mb-4 text-lg d:text-xl">{{ post.title }}</h3>
          <div class="mb-4 flex text-[0.85rem]">
            <a href="/" class="text-white underline">{{
              post.categories.edges[0].node.name
            }}</a>

            <span class="mx-2 text-white">|</span>
            <time>{{
              Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date(post.date))
            }}</time>
          </div>
        </div>
      </div>
    </div>
    <!-- End Posts Grid -->
    <button
      v-if="hasNextPage"
      @click="loadMore"
      class="mb-2 mr-2 mt-12 rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-white"
    >
      Load More
    </button>
  </div>
</template>

<script setup>
import gsap from "gsap";
import gql from "graphql-tag";
import { print } from "graphql";

const config = useRuntimeConfig();

const apiUrl = config.public.wordpressParentApiUrl;
const displayedPosts = ref([]);
const limit = ref(1);
const hasNextPage = ref(false);
const selectedCategory = ref("");

// Get categories
const GET_CATEGORIES = gql`
  query CategoriesQuery {
    categories {
      edges {
        node {
          name
        }
      }
    }
  }
`;
const categoriesData = await $fetch(apiUrl, {
  key: "categories",
  method: "post",
  body: {
    query: print(GET_CATEGORIES),
  },
});

const categories = categoriesData.data.categories.edges
  .map((edge) => edge.node)
  .filter((node) => node.name !== "Uncategorized");

// Query posts
const GET_POSTS = gql`
  query getPosts($limit: Int!, $cursor: String, $category: String) {
    posts(first: $limit, after: $cursor, where: { categoryName: $category }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        date
        featuredImage {
          node {
            altText
            sourceUrl
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
`;

// Fetch & display most recent post
const recentPostData = await $fetch(apiUrl, {
  key: "posts",
  method: "post",
  body: {
    query: print(GET_POSTS),
    variables: {
      limit: 1,
    },
  },
});
const recentPost = recentPostData.data.posts.nodes[0];

// Fetch the rest of the posts
const recentPostCursor = recentPostData.data.posts.pageInfo.endCursor;
const endCursor = ref(recentPostCursor);

const fetchPosts = async (cursor) => {
  const postData = await $fetch(apiUrl, {
    key: "posts",
    method: "post",
    body: {
      query: print(GET_POSTS),
      variables: {
        limit: limit.value,
        cursor: endCursor.value,
        category: selectedCategory.value,
      },
    },
  });
  return postData.data.posts;
};

// Display inital posts
onMounted(async () => {
  const postsData = await fetchPosts(endCursor.value);
  displayedPosts.value = postsData.nodes;
  resetCursor(postsData);
});

// Filter posts
const filterPosts = async (cat) => {
  selectedCategory.value = cat;
  endCursor.value = recentPostCursor;
  const filteredPosts = await fetchPosts(endCursor.value);
  displayedPosts.value = filteredPosts.nodes;
  resetCursor(filteredPosts);
  gsap.fromTo(
    ".posts__grid",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.6,
    }
  );
};

// Display more posts
const loadMore = async () => {
  const morePostsData = await fetchPosts(endCursor.value);
  displayedPosts.value.push(...morePostsData.nodes);
  resetCursor(morePostsData);
};

const resetCursor = (el) => {
  hasNextPage.value = el.pageInfo.hasNextPage;
  endCursor.value = el.pageInfo.endCursor;
};

/*
// Get Featured Post
const GET_RECENT_POST = gql`
  query PostsQuery {
    posts(first: 1) {
      edges {
        cursor
        node {
          title(format: RENDERED)
          excerpt(format: RENDERED)
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

const featuredPostData = await $fetch(config.public.wordpressParentApiUrl, {
  key: "featuredPost",
  method: "post",
  body: {
    query: print(GET_RECENT_POST),
  },
});

const featuredPost = featuredPostData.data.posts.edges[0].node;
const featuredPostCursor = featuredPostData.data.posts.edges[0].cursor;

// Get Categories
const GET_CATEGORIES = gql`
  query CategoriesQuery {
    categories {
      edges {
        node {
          name
        }
      }
    }
  }
`;

const categoriesData = await $fetch(config.public.wordpressParentApiUrl, {
  key: "categories",
  method: "post",
  body: {
    query: print(GET_CATEGORIES),
  },
});

const categories = categoriesData.data.categories.edges
  .map((edge) => edge.node)
  .filter((node) => node.name !== "Uncategorized");

const selectedCategory = ref("");

const fetchPosts = async (cursor = "") => {
  const { data: posts, pending } = await useFetch(
    config.public.wordpressParentApiUrl,
    {
      key: "posts",
      method: "get",
      watch: [selectedCategory],
      query: {
        query: `
          query PostsQuery($cursor: String, $category: String) {
            posts(first: 2, after: $cursor, where: { categoryName: $category }) {
              edges {
                cursor
                node {
                  title(format: RENDERED)
                  content(format: RENDERED)
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
        `,
        variables: {
          cursor: featuredPostCursor,
          category: selectedCategory.value,
        },
      },
      transform(data) {
        let posts = data.data.posts.edges.map((edge) => edge.node);

        if (selectedCategory.value === "") return posts;

        let filteredPosts = posts.filter(
          (post) =>
            post.categories.edges.filter(
              (category) => category.node.name === selectedCategory.value
            ).length
        );
        return filteredPosts;
      },
    }
  );
};
*/
</script>

<style>
.posts__grid-item {
  animation: 0.6s ease-out forwards fadeIn;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
