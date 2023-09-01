export default function (route) {
  let headerGradient = computed(() => {
    if (route.name === "index") {
      return "50vh";
    } else if (route.name === "find-a-home-name") {
      return "25vh";
    } else {
      return null;
    }
  });
  return headerGradient;
}
