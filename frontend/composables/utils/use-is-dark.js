export default function (route) {
  let isDark = computed(() => {
    return route.name !== "index";
  });
  return isDark;
}
