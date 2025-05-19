<template>
  <button
    class="absolute -bottom-1.5 right-0 opacity-0 group-hover:opacity-100 text-xs rounded"
    @click="emojiClick"
  >
    <img alt="Add reaction" title="Add reaction" width="16" height="16" :src="AddReactionIcon" />
  </button>
</template>
<script setup>
import AddReactionIcon from '@/shared/assets/add-reaction.svg';
defineProps({
  emojiClick: Function
});
</script>
