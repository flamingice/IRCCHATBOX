import { ref, watch, nextTick, onBeforeUnmount } from 'vue';

export function useTriggerWithCard() {
  const showCard = ref(false);
  const hideTimeout = ref(null);
  const usernameRef = ref(null);
  const cardRef = ref(null);
  const cardPosition = ref({
    left: '0px',
    top: '100%'
  });

  function calculateCardPosition() {
    if (!usernameRef.value || !cardRef.value) return;

    const usernameRect = usernameRef.value.getBoundingClientRect();
    const cardRect = cardRef.value.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    if (usernameRect.left + cardRect.width > viewportWidth) {
      cardPosition.value = {
        right: '0px',
        top: '100%'
      };
    } else {
      cardPosition.value = {
        left: '0px',
        top: '100%'
      };
    }
  }

  function hideCard() {
    hideTimeout.value = setTimeout(() => {
      showCard.value = false;
    }, 300);
  }

  function clearHideTimeout() {
    if (hideTimeout.value) {
      clearTimeout(hideTimeout.value);
      hideTimeout.value = null;
    }
  }

  watch(showCard, (newValue) => {
    if (newValue) {
      nextTick(() => {
        calculateCardPosition();
      });
    }
  });

  onBeforeUnmount(() => {
    clearHideTimeout();
  });

  return {
    showCard,
    usernameRef,
    cardRef,
    cardPosition,
    hideCard,
    clearHideTimeout
  };
}
