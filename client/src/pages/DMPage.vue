<!-- src/pages/DMPage.vue -->
<template>
  <!-- Scrollable Chat Area -->
  <div ref="chatContainer" class="flex flex-1 overflow-y-auto">
    <div class="w-full max-w-3xl px-4">
      <Chat :messages="messages" />
    </div>
  </div>

  <!-- Input Bar -->
  <div class="flex bg-white py-2 px-4 border-t">
    <div class="w-full max-w-3xl">
      <InputBar @send="handleNewMessage" />
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, provide, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import InputBar from '@/components/InputBar.vue';
import api from '@/services/api';
import Chat from '@/widgets/Chat/ui/Chat.vue';
import { getContrastDarkColor, getRandomDarkColor } from '@/shared/libs/utils/color';

const route = useRoute();
const username = computed(() => route.params.user);
const messages = ref([]);
const chatContainer = ref(null);
console.log(messages);

const scrollToBottom = () => {
  const el = chatContainer.value;
  if (!el) return;
  el.scrollTop = el.scrollHeight;
};

const fetchDMs = async () => {
  try {
    const youMessageColor = getRandomDarkColor();
    const respondentMessageColor = getContrastDarkColor(youMessageColor);
    const res = await api.get(`/dms/${username.value}`);
    messages.value = res.data.map((item, idx) => {
      item.color = idx % 2 === 0 ? respondentMessageColor : youMessageColor;
      return item;
    });
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

const uniqueUsers = computed(() => {
  const seen = new Set();
  return messages.value
    .map((msg) => msg.user)
    .filter((user) => user && user !== 'system' && !seen.has(user) && seen.add(user));
});

// Provide users to the RightSidebar through layout
provide('rightSidebarUsers', uniqueUsers);

onMounted(fetchDMs);
watch(username, fetchDMs);
</script>
