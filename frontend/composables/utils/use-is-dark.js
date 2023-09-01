export default function (route, isMobile) {
  let isDark = computed(() => {
    return (
      route.name === "find-a-home" ||
      route.name === "prequalify" ||
      route.name === "faqs" ||
      route.name === "about-services" ||
      route.name === "agent-name" ||
      route.name === "videos" ||
      route.name === "blog" ||
      route.name === "blog-slug" ||
      route.name === "locations" ||
      route.name === "find-a-home-name"
    );
  });
  return isDark;
}
