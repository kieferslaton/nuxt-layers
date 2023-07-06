export default function (route) {
  const isMobile = useIsMobile();
  let isHeaderFixed = computed(() => {
    return (
      route.name === "index" ||
      (route.name === "find-a-home-name" && isMobile.value)
    );
  });
  return isHeaderFixed;
}