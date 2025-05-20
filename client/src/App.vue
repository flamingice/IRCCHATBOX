<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/widgets/AppLayout.vue';
import { useChannelsStore } from '@/shared/stores/channels';
import { onBeforeMount } from 'vue';

const store = useChannelsStore();
onBeforeMount(async () => {
  await store.fetchChannels();
});
</script>

<style scoped></style>
