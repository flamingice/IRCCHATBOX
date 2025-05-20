<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <div class="flex flex-1 overflow-hidden">
      <!-- Main Chat Area -->
      <div class="flex flex-col flex-1 overflow-hidden">
        <!-- ChatView centered and scrollable -->
        <div ref="chatContainer" class="flex flex-1 overflow-y-auto">
          <div class="w-full max-w-3xl px-4">
            <Chat :title="`#${route.params.name}`" :messages="messages" />
          </div>
        </div>

        <!--  Centered InputBar -->
        <div class="flex bg-white py-2 px-4 border-t">
          <div class="w-full max-w-3xl">
            <InputBar @send="handleNewMessage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import TopNav from '@/components/Layout/TopNav.vue';
import RightSidebar from '@/components/Layout/RightSidebar.vue';
import InputBar from '@/components/InputBar.vue';

import api from '@/services/api';
import Chat from '@/widgets/Chat/ui/Chat.vue';
import { getContrastDarkColor, getRandomDarkColor } from '@/shared/libs/utils/color';

const route = useRoute();
const channelName = computed(() => route.params.name);
const messages = ref([]);
const chatContainer = ref(null);

const fetchMessages = async () => {
  try {
    const youMessageColor = getRandomDarkColor();
    const respondentMessageColor = getContrastDarkColor(youMessageColor);
    const response = await api.get(`/channels/${channelName.value}`);
    messages.value = response.data.map((item, idx) => {
      item.color = idx % 2 === 0 ? respondentMessageColor : youMessageColor;
      return item;
    });
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

const uniqueUsers = computed(() => {
  const seen = new Set();
  return messages.value
    .map((msg) => msg.user)
    .filter((user) => user && user !== 'system' && !seen.has(user) && seen.add(user));
});

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
