<script setup>
defineProps({
  bio: String
});
</script>

<template>
  <p class="mt-3 dark:text-white text-sm text-gray-600">{{ bio }}</p>
</template>
