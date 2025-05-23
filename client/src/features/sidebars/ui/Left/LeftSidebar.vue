<template>
  <div
    class="h-full border-r dark:border-r-gray-950 bg-gray-100 dark:bg-darkBlue text-black dark:text-white p-4 flex flex-col relative"
  >
    <MarkAsRead />
    <Search
      @select-direct-message="selectDirectMessage"
      @select-channel="selectChannel"
      :channels="channels"
      :direct-messages="dms"
    />
    <ChannelList />
    <DMList />
  </div>
</template>

<script setup>
import ChannelList from './ChannelList.vue';
import DMList from './DMList.vue';
import Search from '@/shared/ui/Input/search.vue';
import { useChannelsStore } from '@/shared/stores/channels.js';
import { useDirectMessagesStore } from '@/shared/stores/directMessages.js';
import MarkAsRead from '@/features/MarkAsRead/ui/MarkAsRead.vue';
import { computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { setLastViewed } from '@/helpers/storage.js';
import { CHAT_TYPES } from '@/shared/constants/chat.js';
const DMStore = useDirectMessagesStore();

const channelsStore = useChannelsStore();
onBeforeMount(async () => {
  await channelsStore.fetchLatestTimestamps();
});

const router = useRouter();
const dmUsers = computed(() => DMStore.getDMUsers);
const allChannels = computed(() => channelsStore.getChannels);
const channels = computed(() =>
  allChannels.value.map((n, i) => {
    return {
      id: i,
      name: n
    };
  })
);
const dms = computed(() =>
  dmUsers.value.map((n, i) => ({
    id: i,
    name: n
  }))
);

function selectChannel(channel) {
  setLastViewed(`${CHAT_TYPES.CHANNEL}:${channel.name}`);
  router.push(`/${CHAT_TYPES.CHANNEL}/${channel.name}`);
}

function selectDirectMessage(dm) {
  setLastViewed(`${CHAT_TYPES.DM}:${dm.name}`);
  router.push(`/${CHAT_TYPES.DM}/${dm.name}`);
}
</script>
