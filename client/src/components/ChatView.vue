<template>
  <div class="space-y-4 bg-white text-sm w-full">
    <h2 class="text-lg font-semibold mb-4 sticky top-0 bg-white z-10 py-2">#{{ channelName }}</h2>

    <div
      v-for="(msg, index) in messages"
      :key="index"
      class="flex flex-col gap-1 px-2 hover:bg-gray-50 rounded transition"
    >
      <!-- System message styling -->
      <div v-if="msg.user === 'system'" class="text-center text-xs text-gray-500 italic">
        {{ msg.text }}
      </div>

      <!-- Regular user message styling -->
      <template v-else>
        <div class="flex items-center gap-2">
          <span class="font-medium text-blue-800 cursor-pointer">{{ msg.user }}</span>
          <span class="text-xs text-gray-400">{{ formatTime(msg.timestamp) }}</span>
        </div>
        <div class="ml-4 text-gray-800">
          {{ msg.text }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { format } from 'date-fns';

const props = defineProps(['messages']);
const route = useRoute();
const channelName = computed(() => route.params.name);
const formatTime = (timestamp) => {
  try {
    const parsed = new Date(timestamp);
    return format(parsed, 'MMM d, h:mm a');
  } catch {
    return timestamp;
  }
};
</script>
