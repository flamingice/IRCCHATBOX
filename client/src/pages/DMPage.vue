<template>
  <div class="flex flex-col h-screen">
    <TopNav />
    <div class="flex flex-1 overflow-hidden">
      <Sidebar />
      <!-- Main DM Area with scroll -->
      <div class="flex flex-col flex-1 overflow-hidden">
        <!-- Scrollable Chat Area -->
        <div ref="chatContainer" class="flex justify-center flex-1 overflow-y-auto bg-gray-100">
          <div class="w-full max-w-3xl px-4">
            <DMView :messages="messages" />
          </div>
        </div>

        <!-- Centered InputBar -->
        <div class="flex justify-center bg-white py-2 px-4 border-t">
          <div class="w-full max-w-3xl">
            <InputBar @send="handleNewMessage" />
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue';
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
const chatContainer = ref(null);

const scrollToBottom = () => {
  const el = chatContainer.value;
  if (!el) return;
  el.scrollTop = el.scrollHeight;
};

const fetchDMs = async () => {
  try {
    const res = await api.get(`/dms/${username.value}`);
    messages.value = res.data;
    await nextTick();
    scrollToBottom();
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
    await nextTick();
    scrollToBottom();
  } catch {
    console.error('Failed to send DM');
  }
};

onMounted(fetchDMs);
watch(username, fetchDMs);
</script>
