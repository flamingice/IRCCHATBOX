import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

export function useEmojiReaction(index, activePickerIndex, emit) {
  const pickerRef = ref(null);
  const reaction = ref(null);

  function addReaction(emoji) {
    reaction.value = emoji.i || emoji.emoji;
    emit('toggle-picker', null);
  }

  function clearReaction() {
    reaction.value = null;
  }

  onClickOutside(pickerRef, () => {
    emit('toggle-picker', null);
  });

  return {
    pickerRef,
    reaction,
    addReaction,
    clearReaction
  };
}
