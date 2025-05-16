<template>
  <div class="flex flex-col h-screen">
    <TopNav />
    <div class="flex flex-1 overflow-hidden">
      <Sidebar />
      <div class="flex flex-col flex-1 overflow-hidden">
        <DMView :messages="messages" />
        <InputBar @send="handleNewMessage" />
      </div>
      <RightSidebar />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

import TopNav from '@/components/Layout/TopNav.vue';
import Sidebar from '@/components/Sidebar.vue';
import RightSidebar from '@/components/Layout/RightSidebar.vue';
import DMView from '@/components/DMView.vue';
import InputBar from '@/components/InputBar.vue';
import api from '@/services/api';

const route = useRoute();
const username = computed(() => route.params.user);
const messages = ref([]);

const fetchDMs = async () => {
  try {
    const res = await api.get(`/dms/${username.value}`);
    messages.value = res.data;
  } catch {
    messages.value = [];
  }
};

const handleNewMessage = async (msg) => {
  try {
    await api.post(`/dms/${username.value}`, {
      sender: 'you',
      ...msg
    });
    messages.value.push({ user: 'you', ...msg });
  } catch {
    console.error('Failed to send DM');
  }
};

onMounted(fetchDMs);
watch(username, fetchDMs);
</script>

