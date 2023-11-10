<template>
  <a :href="`/events/${event.slug}`"
    class="deal-card flex flex-col items-center bg-primary-light px-row py-6 text-white lg:h-full lg:p-10">
    <div
      class="deal-card-inner mb-8 flex w-full grow flex-col items-center border border-primary pb-20 pt-10 lg:justify-center">
      <div class="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-secondary">
        <Icon name="sell" size="24" color="white" filled />
      </div>
      <h3 class="mb-5">{{ event.title }}</h3>
      <div v-html="event.excerpt" class="mb-7 text-white"></div>
      <span class="mb-10 flex items-center rounded bg-primary-lighter px-3 py-2">
        <Icon name="schedule" size="12" color="white" class="mr-3" />
        <span class="smallcaps">{{ event.eventDate }} {{ event.eventTime }}</span>
      </span>
      <a href="/" class="text-sm underline">Mark Your Calendar</a>
    </div>
    <p class="deal-card-more mb-3 flex items-center gap-3 font-bold text-white after:text-secondary">
      Get More Details
      <svg xmlns="http://www.w3.org/2000/svg" width="19.5" height="12.438" viewBox="0 0 19.5 12.438"
        class="stroke-secondary">
        <g id="Group_1067" data-name="Group 1067" transform="translate(-357.819 -613.194)">
          <path id="Path_252" data-name="Path 252" d="M366.569,1669.413h18s-3.806-3.4-3.746-5.448"
            transform="translate(-8 -1050)" fill="none" stroke="inherit" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="1.5" />
          <path id="Path_253" data-name="Path 253" d="M366.569,1663.966h18s-3.806,3.4-3.746,5.448"
            transform="translate(-8 -1044.552)" fill="none" stroke="inherit" stroke-linecap="round"
            stroke-linejoin="round" stroke-width="1.5" />
        </g>
      </svg>
    </p>
  </a>
</template>
<script setup>
import getRecentEvent from '~/composables/queries/get-recent-event';

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  subheader: {
    type: String,
    required: true,
  },
  dates: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
const event = await getRecentEvent();
console.log(event);
</script>
