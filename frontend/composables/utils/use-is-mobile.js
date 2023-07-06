export default function () {
  let isMobile;
  if (process.client) {
    const windowWidth = ref(window.innerWidth);

    const updateWidth = () => {
      windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener("resize", updateWidth);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateWidth);
    });

    isMobile = computed(() => windowWidth.value < 1024);
  } else {
    isMobile = false;
  }

  return isMobile;
}
