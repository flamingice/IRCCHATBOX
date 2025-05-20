<template>
  <div class="absolute inset-0 z-50 flex flex-col items-center justify-between bg-white px-4 py-6">
    <!-- Skeleton Messages -->
    <div class="w-full max-w-3xl space-y-4 flex-1 overflow-y-auto">
      <div v-for="n in 8" :key="n" class="space-y-2">
        <div class="flex items-center gap-2">
          <div class="h-4 w-20 bg-gray-200 rounded"></div>
          <div class="h-3 w-16 bg-gray-100 rounded"></div>
        </div>
        <div class="h-4 w-3/4 bg-gray-300 rounded"></div>
      </div>
    </div>

    <!-- Skeleton Input Bar -->
    <div class="w-full max-w-3xl py-3 border-t border-gray-200">
      <div class="h-10 bg-gray-200 rounded"></div>
    </div>

    <!-- Spinner in corner -->
    <div class="absolute bottom-6 right-6">
      <div
        class="spinner h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"
      ></div>
    </div>
  </div>
</template>

<script setup>
// No script needed – it's static UI
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
}
</style>
