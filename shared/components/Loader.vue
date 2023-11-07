<template>
    <div class="w-full flex justify-center py-row">
        <div class="loader"></div>
    </div>
</template>

<style scoped>
.loader {
    border: 16px solid #fff;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>

  