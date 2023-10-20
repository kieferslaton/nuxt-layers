<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-html="content" class="prose"></div>
  </div>
</template>

<script setup>
const route = useRoute();
const { title, content } = await getPage(route.params.uri);
</script>
