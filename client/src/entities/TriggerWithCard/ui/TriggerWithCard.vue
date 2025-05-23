<template>
  <div class="relative inline-block">
    <div ref="usernameRef" @mouseenter="showCard = true" @mouseleave="hideCard">
      <slot name="username" />
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showCard"
        ref="cardRef"
        class="absolute top-0 z-50 w-max dark:bg-gray-950 bg-white rounded-lg shadow-lg border dark:border-darkBlue border-gray-200 p-4 mt-1"
        :style="cardPosition"
        @mouseenter="clearHideTimeout"
        @mouseleave="hideCard"
      >
        <div class="flex items-start space-x-3">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { useTriggerWithCard } from '../model/useTriggerWithCard';

const { showCard, usernameRef, cardRef, cardPosition, hideCard, clearHideTimeout } =
  useTriggerWithCard();
</script>
