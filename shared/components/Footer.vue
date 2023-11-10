<template>
  <Testimonial />
  <footer
    class="flex flex-col items-start bg-primary px-row pb-32 pt-20 leading-loose text-white lg:px-row2x lg:pb-row"
  >
    <div
      class="flex w-full flex-col items-start lg:mb-40 lg:flex lg:flex-row lg:justify-between"
    >
      <a href="/" class="mb-16 self-center lg:mb-0 lg:mr-36 lg:self-start">
        <img :src="currentLogo" alt="Regional Home" class="lg:w-[200px]" />
      </a>

      <div
        v-if="storeData"
        class="flex w-full flex-col justify-between sm:w-2/3 lg:flex-row"
      >
        <div class="mb-6 lg:mb-0">
          <h4>Address</h4>
          <address class="not-italic">
            {{ storeData.address1 }}<br />{{ storeData.city }},
            {{ storeData.state }} {{ storeData.zip }}
          </address>
          <a href="/" class="text-secondary underline">Get Directions</a>
        </div>

        <div class="mb-6 lg:mb-0">
          <h4>Phone</h4>
          <a href="tel:60193913459" class="mb-6 text-secondary underline">{{
            formatPhone(storeData.phone)
          }}</a>
        </div>

        <div class="mb-16 w-full lg:mb-0 lg:w-[20vw]">
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
    </div>
    <div
      class="mb-16 flex w-full flex-nowrap items-center justify-center gap-10 lg:mb-40"
    >
      <div
        v-for="item in ['facebook', 'instagram', 'tiktok', 'youtube']"
        class="flex h-10 w-10 rotate-45 items-center justify-center rounded-sm border border-secondary"
      >
        <SocialIcon class="-rotate-45" :social="item" />
      </div>
    </div>
    <div class="mb-16 flex flex-wrap justify-center lg:mb-10 lg:w-full">
      <a
        class="footer-link px-4 underline"
        v-for="item in menuItems"
        :key="item.node.uri"
        :href="item.node.uri"
        >{{ item.node.label }}</a
      >
    </div>
    <span class="smallcaps self-center">&copy 2023 Regional Enterprises</span>
  </footer>
</template>
<script setup>
const props = defineProps({
  siteType: String,
});

let storeData = null;

if (props.siteType === "store") {
  const { data } = await useFetch("/api/locationinfo");
  storeData = data;
}

const { data: menuItems } = await getMenu("Footer Navigation", props.siteType);

console.log(menuItems);

const footerLinks = [
  {
    title: "Homebuyers Guide",
    link: "homebuyers-guide",
  },
  {
    title: "Extended Warranty",
    link: "extended-warranty",
  },
  {
    title: "Customization Options",
    link: "customize",
  },
  {
    title: "Videos",
    link: "videos",
  },
  {
    title: "Payments",
    link: "link-to-payment",
  },
  {
    title: "Contact Us",
    link: "Contact",
  },
  {
    title: "Privacy Policy",
    link: "privacy",
  },
];

const currentLogo = computed(() => {
  const config = useRuntimeConfig();
  const theme = config.public.theme;
  let logoPath;

  switch (theme) {
    case "Regional":
      logoPath = "/logos/regional-logo-white.svg";
      break;
    case "Town and Country":
      logoPath = "/logos/tc-logo-white.svg";
      break;
    case "brandC":
      logoPath = "/logos/logo-brandC-white.svg";
      break;
    default:
      logoPath = "/logos/default-logo.svg"; // You can set a default logo if needed
      break;
  }

  return logoPath;
});
</script>
