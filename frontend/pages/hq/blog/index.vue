<template>
  <div class="border-t border-primary-lighter pb-4 pl-row pt-6">
    <Breadcrumb />
  </div>
  <!--Featured Post-->
  <div
    class="post flex flex-col border-b border-primary-lighter px-row pb-20 tl:flex-row tl:gap-8 lg:px-row2x"
  >
    <img
      :src="featuredPost.featuredImage?.node?.sourceUrl"
      :alt="featuredPost.featuredImage?.node?.altText"
      class="mb-6 w-full rounded-sm tl:w-1/2"
    />
    <div
      class="flex w-full max-w-sm flex-col justify-center tl:-mt-12 tl:w-1/2"
    >
      <div class="mb-6 flex text-[0.85rem]">
        <a href="/" class="text-white underline">{{
          featuredPost.categories?.edges[0].node?.name
        }}</a>
        <span class="mx-2 text-white">|</span>
        <span>{{
          featuredPost.date
            ? Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date(featuredPost.date))
            : ""
        }}</span>
      </div>
      <h2 class="mb-8 text-4xl">{{ featuredPost.title }}</h2>
      <a
        class="btn btn-transparent self-start"
        :href="`/blog/${featuredPost.slug}`"
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
        @click="selectedCategory = ''"
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
        @click="selectedCategory = category.name"
      >
        {{ category.name }}
      </button>
    </div>
    <!-- Posts Grid -->
    <div
      class="posts__grid grid grid-cols-1 gap-8 tp:grid-cols-2 d:grid-cols-3"
    >
      <div
        v-for="post in posts"
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
      v-if="nextPage"
      @click="loadMore"
      class="mb-2 mr-2 mt-12 rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-white"
    >
      Load More
    </button>
  </div>
</template>

<script setup>
import gql from "graphql-tag";
import { print } from "graphql";

const apiUrl = useRuntimeConfig().public.wordpressParentApiUrl;
const limit = ref(1);
const cursor = ref(null);
const nextPage = ref(false);
const selectedCategory = ref("");

// GET CATEGORIES
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
const categoryData = await $fetch(apiUrl, {
  key: "categories",
  method: "post",
  body: {
    query: print(GET_CATEGORIES),
  },
});
const categories = categoryData.data.categories.edges
  .map((edge) => edge.node)
  .filter((node) => node.name !== "Uncategorized");

// GET POSTS
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
// FEATURED POST
const featuredPostData = await $fetch(apiUrl, {
  key: "posts",
  method: "post",
  body: {
    query: print(GET_POSTS),
    variables: {
      limit: 1,
    },
  },
});
const featuredPost = featuredPostData.data.posts.nodes[0];
cursor.value = featuredPostData.data.posts.pageInfo.endCursor;
nextPage.value = featuredPostData.data.posts.pageInfo.hasNextPage;

// POSTS
const posts = ref([]);
const { data: postData } = await useFetch(apiUrl, {
  method: "get",
  query: {
    query: print(GET_POSTS),
    variables: {
      limit,
      cursor,
      category: selectedCategory,
    },
  },
  transform(data) {
    let postData = data.data.posts;
    return postData;
  },
});

watch(
  postData,
  () => {
    posts.value = [...posts.value, ...postData.value.nodes];
    nextPage.value = postData.value.pageInfo.hasNextPage;
  },
  {
    deep: true,
    immediate: true,
  }
);

watch(selectedCategory, () => {
  posts.value = [];
  cursor.value = featuredPostData.data.posts.pageInfo.endCursor;
});

const loadMore = () => {
  cursor.value = postData.value.pageInfo.endCursor;
};
</script>

<style>
.posts__grid-item {
  animation: 0.4s fadeIn ease-out forwards;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
