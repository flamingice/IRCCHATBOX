<template>
  <div ref="chatContainer" class="flex-1 max-w-3xl overflow-y-auto pt-0 pr-4 pb-4 pl-4 space-y-4 bg-white text-sm">
    <h2 class="text-lg font-semibold mb-4 sticky top-0 bg-white z-10 py-2">
      #{{ username }}
    </h2>

    <div
        v-for="(msg, index) in messages"
        :key="index"
        class="flex flex-col gap-1 py-2 px-2 hover:bg-gray-50 rounded transition"
    >
      <div class="flex items-center gap-2">
        <span class="font-medium text-blue-800">{{ msg.user }}</span>
        <span class="text-xs text-gray-400">{{ formatTime(msg.timestamp) }}</span>
      </div>
      <div class="ml-4 text-gray-800">
        {{ msg.text }}
      </div>
    </div>
  </div>
</template>


<script setup>
import { useRoute } from 'vue-router';
import {computed, nextTick, ref, watch} from 'vue';
import {format} from "date-fns";

const route = useRoute();
const chatContainer = ref(null);
const props = defineProps(['messages']);
const username = computed(() => route.params.user);

const formatTime = (timestamp) => {
  try {
    const parsed = new Date(timestamp);
    return format(parsed, 'MMM d, h:mm a'); // e.g. May 14, 10:42 AM
  } catch {
    return timestamp;
  }
};

watch(
    () => props.messages.length,
    async () => {
      await nextTick();
      scrollToBottom();
    }
);

function scrollToBottom() {
  const el = chatContainer.value;
  if (!el) return;
  el.scrollTop = el.scrollHeight;
}
</script>

