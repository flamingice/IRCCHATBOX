<template>
  <div class="h-full border-r bg-gray-100 p-4 flex flex-col relative">
    <MarkAsRead />
    <ChannelList />
    <DMList />
  </div>
</template>

<script setup>
import ChannelList from '../features/sidebars/ChannelList.vue';
import DMList from '../features/sidebars/DMList.vue';
import MarkAsRead from '@/features/MarkAsRead/MarkAsRead.vue';
</script>
