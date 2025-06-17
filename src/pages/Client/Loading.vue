<template>
  <div class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100 z-[10000]">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loader {
  width: 50px;
  height: 50px;
  border: 5px solid #3498db;
  border-top: 5px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
