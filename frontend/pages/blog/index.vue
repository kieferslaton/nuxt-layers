<template>
  <div class="border-t border-primary-lighter pb-4 pl-row pt-6">
    <Breadcrumb />
  </div>
  <div class="border-b border-primary-lighter px-row pb-20">
    <img
      :src="featuredPost.featuredImage?.node?.sourceUrl"
      :alt="featuredPost.featuredImage?.node?.altText"
      class="mb-4 aspect-auto w-full"
    />
    <div class="mb-4 flex text-[0.85rem]">
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
    <h2 class="mb-6 text-4xl">{{ featuredPost.title }}</h2>
    <a class="btn btn-transparent" :href="`/blog/${featuredPost.slug}`"
      >Continue Reading</a
    >
  </div>
  <div class="px-row pb-20 pt-10" v-if="!pending">
    <div class="-mr-row mb-8 flex overflow-x-scroll lg:overflow-x-auto">
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
    <div
      v-for="post in posts"
      :index="post.slug"
      class="mb-4 overflow-hidden rounded bg-primary-light"
    >
      <img
        v-if="post.featuredImage"
        :src="post.featuredImage.node.sourceUrl"
        :alt="post.featuredImage.node.altText"
        class="aspect-auto w-full"
      />
      <div class="p-row">
        <h3 class="mb-4 text-base">{{ post.title }}</h3>
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
</template>
<script setup>
import gql from "graphql-tag";
import { print } from "graphql";

const config = useRuntimeConfig();

const GET_RECENT_POST = gql`
  query PostsQuery {
    posts(first: 1) {
      edges {
        cursor
        node {
          title(format: RENDERED)
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

const { data: posts, pending } = await useFetch(
  config.public.wordpressParentApiUrl,
  {
    key: "posts",
    method: "get",
    watch: [selectedCategory],
    query: {
      query: `
        query PostsQuery($cursor: String, $category: String) {
          posts(first: 9, after: $cursor, where: { categoryName: $category }) {
            edges {
              cursor
              node {
                title(format: RENDERED)
                content(format: RAW)
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
      console.log(selectedCategory.value);
      if (selectedCategory.value === "") return posts;
      console.log("filtering");
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
</script>
