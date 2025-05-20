<template>
  <div class="mt-3 flex space-x-4">
    <div class="flex flex-col">
      <span class="text-sm font-medium text-gray-900">{{ posts }}</span>
      <span class="text-xs text-gray-500">Followers</span>
    </div>
    <div class="flex flex-col">
      <span class="text-sm font-medium text-gray-900">{{ following }}</span>
      <span class="text-xs text-gray-500">Following</span>
    </div>
    <div class="flex flex-col">
      <span class="text-sm font-medium text-gray-900">{{ posts }}</span>
      <span class="text-xs text-gray-500">Posts</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  posts: Number,
  following: Number,
  followers: Number
});
const { following, followers, posts } = props;
</script>
