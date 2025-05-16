<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <TopNav />
    <div class="flex flex-1 overflow-hidden">
      <Sidebar />
      <div class="flex flex-col flex-1 overflow-hidden">
        <ChatView :messages="messages" />
        <InputBar @send="handleNewMessage" />
      </div>
      <RightSidebar />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

import TopNav from '@/components/Layout/TopNav.vue';
import Sidebar from '@/components/Sidebar.vue';
import RightSidebar from '@/components/Layout/RightSidebar.vue';
import ChatView from '@/components/ChatView.vue';
import InputBar from '@/components/InputBar.vue';

import api from '@/services/api';

const route = useRoute();
const channelName = computed(() => route.params.name);
const messages = ref([]);

const fetchMessages = async () => {
  try {
    const response = await api.get(`/channels/${channelName.value}`);
    messages.value = response.data;
  } catch (err) {
    console.error('Failed to load messages:', err);
    messages.value = [];
  }
};

const handleNewMessage = async (msg) => {
  try {
    await api.post(`/channels/${channelName.value}`, msg);
    messages.value.push(msg);
  } catch (err) {
    console.error('Failed to send message:', err);
  }
};

onMounted(fetchMessages);

watch(channelName, () => {
  fetchMessages();
});
</script>
