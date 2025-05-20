<template>
  <div class="h-full border-r bg-gray-100 p-4 flex flex-col relative">
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
import ChannelList from '../features/sidebars/ui/ChannelList.vue';
import DMList from '../features/sidebars/ui/DMList.vue';
import Search from '@/shared/ui/Input/search.vue';
import { useChannelsStore } from '@/shared/stores/channels';
import { useDirectMessagesStore } from '@/shared/stores/directMessages';
import MarkAsRead from '@/features/MarkAsRead/ui/MarkAsRead.vue';
import { computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { setLastViewed } from '@/helpers/storage';
import { CHAT_TYPES } from '@/shared/constants/chat';
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
