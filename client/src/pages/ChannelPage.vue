<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <TopNav />
    <div class="flex flex-1 overflow-hidden">
      <Sidebar />

      <!-- Main Chat Area -->
      <div class="flex flex-col flex-1 overflow-hidden">
        <!-- ChatView centered and scrollable -->
        <div ref="chatContainer" class="flex justify-center flex-1 overflow-y-auto bg-gray-100">
          <div class="w-full max-w-3xl px-4">
            <ChatView :messages="messages" />
          </div>
        </div>

        <!--  Centered InputBar -->
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
import { ref, computed, onMounted, watch, nextTick } from 'vue';
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
const chatContainer = ref(null);

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
    await nextTick();
    scrollToBottom();
  } catch (err) {
    console.error('Failed to send message:', err);
  }
};

function scrollToBottom() {
  const el = chatContainer.value;
  if (!el) return;
  el.scrollTop = el.scrollHeight;
}

watch(channelName, async () => {
  await fetchMessages();
  await nextTick();
  scrollToBottom();
});

onMounted(async () => {
  await fetchMessages();
  await nextTick();
  scrollToBottom();
});

</script>
