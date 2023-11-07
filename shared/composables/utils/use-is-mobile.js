export default function () {
  const isMobile = ref(null);
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

    isMobile.value = computed(() => windowWidth.value < 1024);
  } else {
    isMobile.value = false;
  }

  return isMobile;
}
