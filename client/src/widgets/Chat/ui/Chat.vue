<template>
  <div class="bg-white text-sm font-mono w-full px-4 py-2">
    <h2 class="text-lg font-semibold mb-4 sticky top-0 bg-white z-10">{{ title }}</h2>

    <div v-for="(msg, index) in messages" :key="index" class="leading-snug mt-0.5">
      <MessageWithAction
        :toggle-picker="togglePicker"
        :user="msg.user"
        :active-picker-index="activePickerIndex"
        :index="index"
        :color="msg.color"
        :text="msg.text"
        :timestamp="msg.timestamp"
      />
    </div>
  </div>
</template>

<script setup>
import { useChat } from '../model/useChat.js';
import MessageWithAction from '@/features/MessageWithAction/MessageWithAction.vue';

const { togglePicker, activePickerIndex } = useChat();

defineProps({
  messages: Array,
  title: String
});
</script>
