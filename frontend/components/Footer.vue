<template>
    <section
        class="border-t border-b border-primary-light text-white pt-28 pb-20 px-row bg-primary lg:border-none lg:px-row2x">
        <div class="flex flex-col items-center lg:border lg:border-primary-light lg:mt-[200px]">
            <div class="relative w-full flex flex-col items-center mb-10 lg:w-auto lg:-mt-[200px] lg:bg-primary lg:px-10">
                <img src="/images/testimonial-mask.png" class="w-[275px] lg:w-[480px]" />
                <h3 class="absolute text-7xl bottom-0 font-normal font-script" style="line-height: 0.3;">Testimonials</h3>
            </div>
            <blockquote class="mb-5 max-w-[580px] lg:text-center">"Thank you so much for your help. You made the buying
                process simple and
                easy.
                I will
                most
                definitely be
                recommending you to my friends!"</blockquote>
            <div class="flex items-center mb-14 lg:flex-col">
                <div class="w-10 h-10 mr-3 rounded-full bg-cover bg-center lg:w-20 lg:h-20 lg:mr-0 lg:mb-5"
                    style="background-image: url('/images/testimonial-badge.png')"></div>
                <span>Brad J</span>
            </div>
            <a href="/" class="btn btn-secondary lg:hidden">Send Us A Message</a>
        </div>
    </section>
    <footer class="px-row pt-20 pb-32 bg-primary text-white flex flex-col items-start leading-loose lg:px-row2x  lg:pb-row">
        <div class="flex flex-col items-start lg:flex lg:flex-row lg:justify-between w-full lg:mb-40">
            <a href="/" class="mb-16 self-center lg:self-start lg:mr-36 lg:mb-0">
                <img :src="logoWhite" alt="Regional Home" class="lg:w-[200px]" />
            </a>
            <div class="mb-6 lg:mb-0">
                <h4>Address</h4>
                <address class="not-italic">2845 US-80 E <br />Pearl, MS 39208</address>
                <a href="/" class="underline text-secondary">Get Directions</a>
            </div>
            <div class="mb-6 lg:mb-0">
                <h4>Phone</h4>
                <a href="tel:60193913459" class="underline text-secondary mb-6">(601) 939-1459</a>
            </div>
            <div class="w-full mb-16 lg:w-[20vw] lg:mb-0">
                <h4>Hours</h4>
                <table>
                    <tr>
                        <td>Mon-Fri</td>
                        <td>8am-5pm</td>
                    </tr>
                    <tr>
                        <td>Sat</td>
                        <td>9am-4pm</td>
                    </tr>
                    <tr>
                        <td>Sun</td>
                        <td>Closed</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="flex items-center gap-10 flex-nowrap justify-center w-full mb-16 lg:mb-40">
            <div v-for="item in ['facebook', 'instagram', 'tiktok', 'youtube']"
                class="border border-secondary rounded-sm h-10 w-10 rotate-45 flex items-center justify-center">
                <SocialIcon class="-rotate-45" :social="item" />
            </div>
        </div>
        <div class="flex flex-wrap justify-center mb-16 lg:w-full lg:mb-10">
            <a class="underline footer-link px-4" v-for="(link, index) in footerLinks" :key="link.url" :href="link.url">{{
                link.title }}</a>
        </div>
        <span class="smallcaps self-center">&copy 2023 Regional Enterprises</span>
    </footer>
</template>
<script setup>
import logoWhite from '~/assets/images/logo-white.svg'
const footerLinks = [
    {
        title: 'Homebuyers Guide',
        link: 'homebuyers-guide'
    },
    {
        title: 'Extended Warranty',
        link: 'extended-warranty'
    },
    {
        title: 'Customization Options',
        link: 'customize'
    },
    {
        title: 'Videos',
        link: 'videos'
    },
    {
        title: 'Payments',
        link: 'link-to-payment'
    },
    {
        title: 'Contact Us',
        link: 'Contact'
    },
    {
        title: 'Privacy Policy',
        link: 'privacy'
    }
]
</script>