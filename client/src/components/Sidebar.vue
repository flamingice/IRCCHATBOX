<template>
  <div class="h-full border-r bg-gray-100 p-4 flex flex-col relative">
    <ChannelList v-if="isChannelView" />
    <DMList v-else-if="isDMView" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ChannelList from '@/components/Sidebar/ChannelList.vue';
import DMList from '@/components/Sidebar/DMList.vue';

const route = useRoute();
const isChannelView = computed(() => route.path.startsWith('/channel/'));
const isDMView = computed(() => route.path.startsWith('/dm/'));
</script>