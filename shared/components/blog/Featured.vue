<template>
  <div class="-mr-row mb-6 flex overflow-x-scroll lg:overflow-x-auto">
    <button
      class="mr-3 rounded-md border border-primary-lighter px-5 py-2"
      :class="selectedCategory === null ? 'border-none bg-secondary' : ''"
      @click="selectedCategory = null"
    >
      All
    </button>
    <button
      class="mr-3 rounded-md border border-primary-lighter px-5 py-2"
      :class="
        selectedCategory === category.id ? 'border-none bg-secondary' : ''
      "
      v-for="category in categories"
      :key="category.id"
      @click="selectedCategory = category.id"
    >
      {{ category.name }}
    </button>
  </div>
</template>
<script setup>
import gql from "graphql-tag";
import { print } from "graphql";
const config = useRuntimeConfig();

const featuredPostCursor = inject("featuredPostCursor");
</script>
