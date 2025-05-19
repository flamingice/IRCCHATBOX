<template>
  <div class="max-w-3xl border-t p-4">
    <form @submit.prevent="sendMessage" class="flex gap-2">
      <input
        v-model="message"
        type="text"
        placeholder="Type a message..."
        class="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring"
      />
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Send
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('');
const emit = defineEmits(['send']);

function sendMessage() {
  if (!message.value.trim()) return;

  emit('send', {
    user: 'you',
    text: message.value,
    timestamp: new Date().toISOString().slice(0, 16).replace('T', ' ')
  });

  message.value = '';
}
</script>
