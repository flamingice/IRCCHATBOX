<template>
  <div class="h-full border-r bg-gray-100 p-4 flex flex-col relative">
    <Search :channels="dms" :direct-messages="directMessages" />
    <ChannelList />
    <DMList />
  </div>
</template>

<script setup>
import ChannelList from '../features/sidebars/ChannelList.vue';
import DMList from '../features/sidebars/DMList.vue';
import Search from '@/shared/ui/Input/search.vue';
import { useChannelsStore } from '@/shared/stores/channels.js';
import { useDirectMessagesStore } from '@/shared/stores/directMessages.js';
import { storeToRefs } from 'pinia';

const channelsStore = useChannelsStore();
const DMStore = useDirectMessagesStore();

const { channels } = storeToRefs(channelsStore);
const { directMessages } = storeToRefs(DMStore);
console.log(directMessages);
console.log(channels);
const dms = DMStore.directMessages.map((n, i) => ({
  id: i,
  name: n
}));
</script>
