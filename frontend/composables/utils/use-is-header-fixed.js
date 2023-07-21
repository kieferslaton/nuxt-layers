export default function (route, isMobile) {
  let isHeaderFixed = computed(() => {
    return (
      route.name === "index" ||
      route.name === "faqs" ||
      route.name === "about-services" ||
      (route.name === "find-a-home-name" && isMobile)
    );
  });
  return isHeaderFixed;
}
