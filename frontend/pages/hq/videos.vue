<template>
  <div class="border-t border-primary-lighter pb-4 pl-row pt-6">
    <Breadcrumb />
  </div>
  <div class="flex flex-col">
    <div class="mb-12" v-for="video in videos" :key="video.id">
      <div class="aspect-video w-full">
        <div class="youtube-player" :id="'player-' + video.id"></div>
      </div>
      <div class="mt-4 w-full px-row">
        <h4 class="text-lg font-bold">{{ video.title }}</h4>
      </div>
    </div>
  </div>
</template>
<script setup>
const videos = await $fetch("/api/videos");

onMounted(() => {
  for (let i = 0; i < videos.length; i++) {
    new YT.Player(`player-${videos[i].id}`, {
      width: "100%",
      height: "100%",
      videoId: videos[i].id,
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        controls: 0,
      },
    });
  }
});
</script>
