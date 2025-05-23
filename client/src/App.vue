<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/widgets/AppLayout.vue';
import { useChannelsStore } from '@/shared/stores/channels';
import { onBeforeMount } from 'vue';
import { useDirectMessagesStore } from '@/shared/stores/directMessages';
import { useMessagesStore } from '@/shared/stores/messages';
import { useTheme } from '@/shared/stores/composables/useTheme';

useTheme();

const channelStore = useChannelsStore();
const dmStore = useDirectMessagesStore();
useMessagesStore();

onBeforeMount(async () => {
  channelStore.fetchChannels();
  channelStore.fetchLatestTimestamps();
  dmStore.fetchDMUsers();
  dmStore.fetchLatestTimestamps();
});
</script>

<style scoped></style>
