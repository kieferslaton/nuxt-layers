export default function (route) {
  let isMobile = useIsMobile();
  let isDark = computed(() => {
    return (
      route.name === "find-a-home" ||
      (route.name === "find-a-home-name" && !isMobile.value)
    );
  });
  return isDark;
}
