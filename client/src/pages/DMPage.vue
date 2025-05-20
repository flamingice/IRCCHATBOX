<template>
  <!-- Scrollable Chat Area -->
  <div ref="chatContainer" class="flex flex-1 overflow-y-auto">
    <div class="w-full max-w-3xl px-4">
      <Chat :title="username" :messages="messages" />
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
import { storeToRefs } from 'pinia';

import InputBar from '@/components/InputBar.vue';
import Chat from '@/widgets/Chat/ui/Chat.vue';
import { useDirectMessagesStore } from '@/shared/stores/directMessages';

const route = useRoute();
const username = computed(() => route.params.user);

const chatContainer = ref(null);

const dmsStore = useDirectMessagesStore();
const { messages } = storeToRefs(dmsStore);

const scrollToBottom = () => {
  const el = chatContainer?.value;
  if (!el) return;
  el.scrollTop = el.scrollHeight;
};

const fetchAndScroll = async () => {
  await dmsStore.fetchDMs(username.value);
  await nextTick();
  scrollToBottom();
};

const handleNewMessage = async (msg) => {
  await dmsStore.sendDM(username.value, msg);
  scrollToBottom();
};

const uniqueUsers = computed(() => {
  const seen = new Set();
  return messages.value
    .map((msg) => msg.user)
    .filter((user) => user && user !== 'system' && !seen.has(user) && seen.add(user));
});

// Provide users to the RightSidebar through layout
provide('rightSidebarUsers', uniqueUsers);

// Lifecycle
onMounted(fetchAndScroll);
watch(username, fetchAndScroll);
</script>
