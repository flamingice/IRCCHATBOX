<style scoped>
.fade-enter-active {
  transition: opacity 0.3s ease;
}
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
}
</style>
<template>
  <div class="flex flex-col h-screen overflow-hidden relative">
    <div class="flex flex-1 overflow-hidden">
      <!-- Main Chat Area -->
      <div class="flex flex-col flex-1 overflow-hidden">
        <!-- ChatView centered and scrollable -->
        <div ref="chatContainer" class="flex flex-1 overflow-y-auto">
          <div v-if="isFetched" :key="channelName" class="w-full max-w-3xl px-4 mx-auto">
            <Chat :title="`#${channelName}`" :messages="messages" />
          </div>
        </div>

        <!-- Centered InputBar -->
        <div class="flex bg-white py-2 px-4 border-t">
          <div class="w-full max-w-3xl mx-auto">
            <InputBar @send="handleNewMessage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import InputBar from '@/components/InputBar.vue';
import { useRoute } from 'vue-router';
import { useChannelsStore } from '@/shared/stores/channels';

import api from '@/services/api';
import Chat from '@/widgets/Chat/ui/Chat.vue';
import { storeToRefs } from 'pinia';
import { useMessagesStore } from '@/shared/stores/messages';

const route = useRoute();
const store = useChannelsStore();
const messagesStore = useMessagesStore();
const chatContainer = ref(null);

const { messages, hasFetchedMessages } = storeToRefs(messagesStore);
const channelName = computed(() => store.getChannelName(route.params.name));
const isFetched = computed(() => hasFetchedMessages);

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
  await messagesStore.fetchMessages(route.params.name);
  await nextTick();
  scrollToBottom();
});

onMounted(async () => {
  await messagesStore.fetchMessages(route.params.name);
  await nextTick();
  scrollToBottom();
});
</script>
