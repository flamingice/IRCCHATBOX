<template>
  <nav
    class="flex items-center justify-between px-4 py-4 border-b dark:border-b-gray-950 dark:bg-darkBlue bg-white"
  >
    <div
      class="flex items-center gap-2 dark:drop-shadow dark:shadow-white border-red-400 before:border-none after:border-none z"
    >
      <img src="/ircchatboxlogo.png" class="h-6 w-auto" alt="logo" />
    </div>
    <div class="flex gap-6 items-center text-sm text-gray-600">
      <template v-for="link in navLinks" :key="link.to">
        <!-- Dummy links (no routing) -->
        <span
          v-if="link.disabled"
          class="hover:underline cursor-pointer dark:text-white/70 text-gray-400"
          @click.prevent
        >
          {{ link.label }}
        </span>

        <!-- Real links -->
        <RouterLink
          v-else
          :to="link.to"
          :class="[
            isActive(link.label)
              ? 'font-bold  dark:text-white text-black underline'
              : 'hover:underline'
          ]"
        >
          {{ link.label }}
        </RouterLink>
      </template>
      <ToggleTheme />
      <button
        @click="handleClick"
        class="p-2 rounded-md transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-950 dark:focus:ring-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-300"
        aria-label="Settings"
      >
        <Settings class="h-5 w-5" />
      </button>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { Settings } from 'lucide-vue-next';
import ToggleTheme from '@/features/ToggleTheme/ToggleTheme.vue';

const navLinks = [
  { label: 'Home', to: '/channel/general', url: '/channel/' },
  // { label: 'Chat Rooms', to: '/channel/general', url: '/channel/' },
  // { label: 'Direct Messages', to: '/dm/djmax', url: '/dm/' },
  { label: 'Help', to: '/help', disabled: true },
  { label: 'About', to: '/about', disabled: true },
  { label: 'Login', to: '/login', disabled: true }
];

const isActive = (label) => label === 'Home'; // TODO - as a temporary solution
</script>
