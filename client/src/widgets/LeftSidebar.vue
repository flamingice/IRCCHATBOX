<template>
  <div class="h-full border-r bg-gray-100 p-4 flex flex-col relative">
    <MarkAsRead />
    <input
      placeholder="Search channels, users…"
      class="w-full h-7 outline-none focus:outline-none border border-black px-3 py-1 my-2 rounded-md"
    />
    <ChannelList />
    <DMList />
  </div>
</template>

<script setup>
import ChannelList from '../features/sidebars/ChannelList.vue';
import DMList from '../features/sidebars/DMList.vue';
import MarkAsRead from '@/features/MarkAsRead/MarkAsRead.vue';
</script>
