<template>
  <div class="relative pr-6 group">
    <span class="text-gray-800 ml-1 p-1 transition-colors rounded-md">
      {{ text }}
    </span>

    <!-- Reaction display -->
    <div
      v-if="reaction"
      class="text-sm absolute -top-5 -right-2 px-2 py-1 w-min bg-gray-200 rounded-xl"
    >
      <span @click="clearReaction" class="cursor-pointer">
        {{ reaction }}
      </span>
    </div>

    <!-- Reaction trigger -->

    <div
      v-if="activePickerIndex === index"
      ref="pickerRef"
      class="absolute z-10 bottom-6 -right-12"
    >
      <EmojiPicker
        :disabled-groups="[
          'animals_nature',
          'food_drink',
          'activities',
          'travel_places',
          'objects',
          'symbols',
          'flags'
        ]"
        :disable-skin-tones="true"
        @display-recent="true"
        @select="addReaction"
      />
    </div>
    <EmojiButton :emoji-click="() => emit('toggle-picker', index)" />
  </div>
</template>

<script setup>
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
import { useEmojiReaction } from '../model/useEmojiReaction';
import EmojiButton from '@/shared/ui/EmojiButton.vue';

const props = defineProps({
  text: String,
  index: Number,
  activePickerIndex: Number
});

const emit = defineEmits(['toggle-picker']);

const { pickerRef, reaction, addReaction, clearReaction } = useEmojiReaction(
  props.index,
  props.activePickerIndex,
  emit
);
</script>
