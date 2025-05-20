<script setup>
defineProps({
  name: String,
  src: String
});
</script>

<template>
  <div class="flex-shrink-0">
    <img
      :src="src"
      :alt="`${name}'s profile picture`"
      class="h-12 w-12 rounded-full object-cover"
    />
  </div>
</template>
