<template>
    <div class="px-row">
        <Card class="mb-row2x">
            <img :src="event.featuredImage.node.sourceUrl" />
            <div class="p-row flex flex-col items-center">
                <h1 class="text-4xl mb-4">{{ event.title }}</h1>
                <div class="mb-4" v-html="event.excerpt"></div>
                <div class="flex justify-center gap-4">
                    <div class="flex p-3 items-center border rounded-sm border-primary-lighter">
                        <Icon class="text-gray-light mr-2" name="event" color="primary-lighter" size="14" filled />
                        <span class="smallcaps">{{ event.eventDate }}</span>
                    </div>
                    <div class="flex p-3 items-center border rounded-sm border-primary-lighter">
                        <Icon class="text-gray-light mr-2" name="schedule" color="primary-lighter" size="14" filled />
                        <span class="smallcaps">{{ event.eventTime }}</span>
                    </div>
                </div>
            </div>
        </Card>
        <FeaturedHomes />
        <ContactForm />
    </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
const route = useRoute();
console.log('Route: ' + route.params.slug);
const event = await getEvent(route.params.slug);
</script>