export default function (route, isMobile) {
  let isDark = computed(() => {
    return (
      route.name === "find-a-home" ||
      route.name === "prequalify" ||
      route.name === "faqs" ||
      route.name === "about-services" ||
      (route.name === "find-a-home-name" && !isMobile.value)
    );
  });
  return isDark;
}
