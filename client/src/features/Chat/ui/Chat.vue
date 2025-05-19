<template>
  <div class="bg-white text-sm font-mono w-full px-4 py-2">
    <h2 class="text-lg font-semibold mb-4 sticky top-0 bg-white z-10">#{{ title }}</h2>

    <div v-for="(msg, index) in messages" :key="index" class="leading-snug mt-5">
      <!-- System message -->
      <div v-if="msg.user === 'system'" class="text-gray-500 italic">
        <span class="text-gray-400 w-[70px] inline-block">{{ formatTime(msg.timestamp) }}</span>
        * {{ msg.text }}
      </div>

      <!-- Regular message -->
      <template v-else>
        <div class="flex items-center gap-1 group">
          <!-- time -->
          <span class="text-gray-600 w-[70px] inline-block">{{ formatTime(msg.timestamp) }}</span>
          <span class="text-black">|</span>
          <!-- row -->
          <div class="flex rounded-md py-1 hover:bg-gray-300">
            <div class="ml-2 flex items-center">
              <!-- username -->
              <span class="font-bold" :style="{ color: msg.color || '#000' }">
                {{ msg.user }}:
              </span>

              <!-- message -->
              <Message
                :msg="msg"
                :index="index"
                :activePickerIndex="activePickerIndex"
                @toggle-picker="togglePicker"
              />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import Message from '@/entities/message/ui/Message.vue';
import { formatTime } from '@/shared/libs/utils/time';
import { useChat } from '../model/useChat';

const { togglePicker, activePickerIndex } = useChat();

const props = defineProps({
  messages: Array,
  title: String
});
</script>
