import { ref } from 'vue';

export function useChat() {
  const activePickerIndex = ref(null);

  function togglePicker(index) {
    activePickerIndex.value = activePickerIndex.value === index ? null : index;
  }

  return {
    togglePicker,
    activePickerIndex
  };
}
