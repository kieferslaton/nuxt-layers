<template>
  <div class="border-primary-lighter pl-row border-t pb-4 pt-6">
    <Breadcrumb />
  </div>
  <!--Featured Post-->
  <div
    class="post border-primary-lighter px-row tl:flex-row tl:gap-8 lg:px-row2x flex flex-col border-b pb-20"
  >
    <!-- Homebuyer's Guide -->
    <div class="mb-6 w-full rounded-sm lg:w-1/2">
      <div
        class="pt-row tl:pb-[20vw] flex items-start justify-center rounded-sm bg-white bg-cover bg-bottom bg-no-repeat pb-[30vw] shadow-lg lg:pb-[12.5vw] lg:pt-8"
        :style="{
          backgroundImage: `url('${pageData.homebuyersGuideCopy.background.sourceUrl}')`,
        }"
      >
        <h2 class="text-gray-dark mb-5 text-center uppercase tracking-wider">
          <span class="font-script text-accent text-4xl normal-case">The</span
          ><br />
          Home<br />
          Buyer's<br />
          Guide
        </h2>
      </div>
    </div>
    <div
      class="tl:-mt-12 tl:w-1/2 flex w-full max-w-sm flex-col justify-center"
    >
      <p class="mb-7 max-w-xs text-white">
        {{ pageData.homebuyersGuideCopy.subheader }}
      </p>
      <NuxtLink href="/homebuyers-guide" class="btn btn-secondary"
        >Start Learning Now</NuxtLink
      >
    </div>
  </div>
  <!--End Featured Post-->
  <div class="px-row lg:px-row2x pb-20 pt-10">
    <div
      class="no-scrollbar -mr-row mb-8 flex overflow-x-scroll lg:overflow-x-auto"
    >
      <button
        class="border-primary-light mr-3 flex items-center rounded-md border px-5 py-2"
        :class="selectedCategory === '' ? 'bg-secondary border-none' : ''"
        @click="selectedCategory = ''"
      >
        All
      </button>
      <button
        class="border-primary-light mr-3 rounded-md border px-5 py-2"
        :class="
          category.name === selectedCategory ? 'bg-secondary border-none' : ''
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
      class="posts__grid tp:grid-cols-2 d:grid-cols-3 grid grid-cols-1 gap-8"
    >
      <div
        v-for="post in posts"
        :index="post.slug"
        class="posts__grid-item bg-primary-light overflow-hidden rounded"
      >
        <img
          v-if="post.featuredImage"
          :src="post.featuredImage.node.sourceUrl"
          :alt="post.featuredImage.node.altText"
          class="aspect-auto w-full"
        />
        <div class="px-row tp:px-8 py-6">
          <h3 class="d:text-xl mb-4 text-lg">{{ post.title }}</h3>
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
      class="bg-secondary mb-2 mr-2 mt-12 rounded-md px-5 py-2.5 text-sm font-medium text-white"
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
        slug
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

// Get homebuyers guide
const { data: pageData } = await getMarketingPage();
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
