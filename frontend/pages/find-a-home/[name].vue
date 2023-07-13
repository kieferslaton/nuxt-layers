<template>
    <div class="home-single lg:px-row2x">
        <section class="w-full h-[140vw] bg-cover bg-bottom lg:h-[640px]"
            :style="{ backgroundImage: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.3)), url('${home.defaultImageUrl}')` }">
        </section>
        <section
            class="px-row pt-12 bg-primary text-white pb-10 border-b border-primary lg:flex lg:items-end lg:justify-between lg:pt-0 lg:bg-transparent lg:-mt-10">
            <div>
                <h2 class="mb-4 lg:text-7xl">{{ home.name }}</h2>
                <p class="smallcaps text-gray-light mb-5">Built By <a class="underline" href="#">Hamilton</a></p>
                <div class="flex w-full justify-between mb-10 lg:mb-0">
                    <span>{{ home.beds }} Bed / {{ home.baths }}Bath / {{ home.length * home.width }}ft<sup>2</sup></span>
                    <span class="font-bold">{{ home.category }}</span>
                </div>
            </div>
            <div class="flex w-full gap-5 lg:w-auto">
                <a href="" class="btn btn-secondary flex items-center flex-1">
                    <Icon name="phone" size="20" color="white" filled class="mr-3" />
                    Call Us
                </a>
                <a href="" class="btn btn-transparent flex items-center">
                    <Icon name="check" size="20" color="white" filled class="mr-3" />
                    Get Prequalified
                </a>
            </div>
        </section>
        <section class="px-row pt-10 pb-20 bg-primary flex flex-col items-center lg:px-0">
            <div class="bg-white rounded px-row py-row mb-20 lg:px-row2x">
                <div class="flex flex-col lg:flex-row-reverse lg:gap-20">
                    <img src="/images/home-single-illo.png" class="w-full mb-5 lg:basis-[40%] shrink-0" />
                    <div>
                        <h6 class="mb-4">Description</h6>
                        <p class="mb-7">This home maximizes space and lighting in areas you need it most. It features a
                            quality
                            design and a
                            unique layout, with a price you’re sure to love! And don’t forget, customization options are
                            available
                            to make this home truly one-of-a-kind.</p>
                        <div class="lg:flex lg:items-center lg:gap-8">
                            <a class="btn btn-secondary-transparent btn-full flex items-center mb-5 lg:mb-0 lg:px-4"
                                href="#">
                                <Icon name="360" size="18" color="secondary" class="mr-3" />
                                Take 3D Tour
                            </a>
                            <a class="btn btn-secondary-transparent btn-full flex items-center mb-16 lg:mb-0 lg:px-4"
                                href="#">
                                <Icon name="grid_on" size="18" color="secondary" class="mr-3" />
                                View Floor Plan
                            </a>
                        </div>
                    </div>
                </div>
                <h6 class="lg:mt-row2x">Floor Plan Specifications</h6>
                <Accordion :items="items" v-if="isMobile" />
                <Tabs :items="items" v-else />
            </div>
            <a class="btn btn-transparent btn-auto border-primary-lighter flex items-center" href='/find-a-home'>
                <Icon name="keyboard_arrow_left" color="secondary" size="16" class="mr-3" />
                Back to Home Search
            </a>
        </section>
    </div>
</template>
<script setup>
const route = useRoute();
const isMobile = useIsMobile();
const { data: home } = await useFetch(`/api/home?name=${route.params.name}`)

const items = [
    {
        name: 'Baths',
        icon: 'baths',
        html: `
        <div>
            <h6>Bathroom Additional Specs: </h6>
            <ul>
                <li>Efficiently Designed Bathroom Layouts</li>
                <li>Large Mirrors at Sink Locations</li>
                <li>GFCI Recepts in Convenient Locations</li>
            </ul>
        </div>
        <div>
            <h6>Bathroom Fans:</h6>
            <ul>
                <li>Powerful Exhaust Fans in All Baths</li>
            </ul>
        </div>
        <div>
            <h6>Bathroom Flooring:</h6>
            <ul>
                <li>Bath Friendly Vinyl Flooring</li>
            </ul>
        </div>
        <div>
            <h6>Bathroom Shower:</h6>
            <ul>
                <li>54" Tub/Shower in Guest Bathrooms</li>
                <li>48" Separate Show in MBA Glamour Bath</li>
            </ul>
        </div>
        <div>
            <h6>Bathroom Toilet Type:</h6>
            <ul>
                <li>Water Saver Commodes</li>
            </ul>
        </div>
        `
    },
    {
        name: 'Construction',
        icon: 'construction',
        html: `
        <div>
            <h6>Construction Additional Specs: </h6>
            <ul>
                <li>High-Quality Construction Materials</li>
                <li>Structurally Sound Design</li>
                <li>Experienced Construction Team</li>
            </ul>
        </div>
        `
    },
    {
        name: 'Exterior',
        icon: 'exterior',
        html: `
        <div>
            <h6>Exterior Additional Specs: </h6>
            <ul>
                <li>Stylish and Modern Exterior Design</li>
                <li>Durable Siding and Roofing Materials</li>
                <li>Well-Maintained Landscaping</li>
            </ul>
        </div>
        `
    },
    {
        name: 'Interior',
        icon: 'interior',
        html: `
        <div>
            <h6>Interior Additional Specs: </h6>
            <ul>
                <li>Thoughtfully Designed Interiors</li>
                <li>Spacious Living Areas</li>
                <li>Quality Flooring and Finishes</li>
            </ul>
        </div>
        `
    },
    {
        name: 'Kitchen',
        icon: 'kitchen',
        html: `
        <div>
            <h6>Kitchen Additional Specs: </h6>
            <ul>
                <li>Modern Kitchen Design</li>
                <li>High-Quality Cabinetry and Countertops</li>
                <li>Energy-Efficient Appliances</li>
            </ul>
        </div>
        `
    },
    {
        name: 'Utilities',
        icon: 'utilities',
        html: `
        <div>
            <h6>Utilities Additional Specs: </h6>
            <ul>
                <li>Reliable and Efficient Utility Services</li>
                <li>Properly Installed Electrical and Plumbing Systems</li>
                <li>Energy-Efficient Heating and Cooling</li>
            </ul>
        </div>
        `
    }
]


</script>