<template>
  <div class="border-t border-primary-lighter pb-4 pl-row pt-6">
    <Breadcrumb />
  </div>
  <div class="border-b border-primary-lighter pb-20">
    <div class="mb-4 h-[65vh] overflow-hidden">
      <img :src="post.featuredImage?.node?.sourceUrl" :alt="post.featuredImage?.node?.altText"
        class="h-full w-full rounded-none object-cover" />
    </div>
    <div class="px-row d:px-row2x">
      <div class="mb-4 flex text-[0.85rem]">
        <a href="/" class="text-white underline">{{
          post.categories?.edges[0].node?.name
        }}</a>
        <span class="mx-2 text-white">|</span>
        <span>{{
          post.date
          ? Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(new Date(post.date))
          : ""
        }}</span>
      </div>
      <h2 class="mb-6 text-4xl">{{ post.title }}</h2>
      <div class="wp-content mb-6 rounded bg-primary-light p-row" v-html="post.content"></div>
    </div>
  </div>
</template>
<script setup>
import gql from "graphql-tag";
import { print } from "graphql";

// definePageMeta({
//   middleware: 
// })

const route = useRoute();
const config = useRuntimeConfig();

const GET_POST = gql`
query PostsQuery {
    posts(where: { name: "${route.params.slug}" }) {
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
`;

const postData = await $fetch(config.public.wordpressParentApiUrl, {
  key: "singlePost",
  method: "post",
  body: {
    query: print(GET_POST),
  },
});

const post = postData.data.posts.edges[0].node
</script>
