<script setup>
import { ref } from 'vue';

defineProps({
  followUser: Function,
  isFollowing: Boolean
});
const follow = ref(false);
</script>

<template>
  <button
    class="inline-flex outline-none h-min w-min bg-blue-600 my-2 items-center px-3 py-1 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    @click.stop="follow = !follow"
  >
    {{ follow ? 'Following' : 'Follow' }}
  </button>
</template>
