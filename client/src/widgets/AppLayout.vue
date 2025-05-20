<template>
  <div class="flex flex-col h-screen">
    <TopNav />
    <div class="flex flex-1 overflow-hidden">
      <LeftSidebar />

      <div class="flex flex-col flex-1 overflow-hidden">
        <router-view />
      </div>

      <RightSidebar :users="rightSidebarUsers" />
    </div>
  </div>
</template>

<script setup>
import TopNav from '@/features/nav/TopNav.vue';
import LeftSidebar from '@/widgets/LeftSidebar.vue';
import RightSidebar from '@/widgets/RightSidebar.vue';
import { computed, inject } from 'vue';
import { useRoute } from 'vue-router';
import { useDirectMessagesStore } from '@/shared/stores/directMessages.js';

const chatType = computed(() => route.params.chat); // 'channel' or 'dm'
const route = useRoute();
const dmsStore = useDirectMessagesStore();
const isChannel = computed(() => chatType.value === 'channel');

const uniqueUsers = computed(() => {
  if (isChannel.value) return dmsStore.getDMUsers;
  const seen = new Set();
  return dmsStore.directMessages
    .map((msg) => msg.user)
    .filter((user) => user && user !== 'system' && !seen.has(user) && seen.add(user));
});

const rightSidebarUsers = inject('rightSidebarUsers', uniqueUsers);
</script>
