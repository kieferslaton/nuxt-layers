export default function (route, isMobile) {
  let isHeaderFixed = computed(() => {
    return (
      route.name === "uri" ||
      route.name === "index" ||
      route.name === "faqs" ||
      route.name === "about-services" ||
      route.name === "find-a-home-name"
    );
  });
  return isHeaderFixed;
}
