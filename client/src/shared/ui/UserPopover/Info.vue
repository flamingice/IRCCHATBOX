<script setup>
defineProps({
  name: String,
  username: String
});
</script>

<template>
  <div class="flex-1 min-w-0">
    <p class="text-sm dark:text-white/80 font-medium text-gray-900 truncate">{{ name }}</p>
    <p class="text-sm dark:text-white text-gray-500 truncate hover:underline">@{{ username }}</p>
  </div>
</template>
