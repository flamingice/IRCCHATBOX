<template>
  Moon
  <button
    @click="toggleTheme"
    class="p-2 rounded-md transition-colors duration-200 dark:hover:bg-gray-950 hover:bg-gray-100 focus:outline-none focus:ring-2 dark:focus:ring-gray-950 focus:ring-gray-300"
    aria-label="Toggle theme"
  >
    <Sun v-if="isDark" class="h-5 w-5 text-yellow-500" />
    <Moon v-else class="h-5 w-5 text-gray-700" />
  </button>
</template>

<script setup>
import { Moon, Sun } from 'lucide-vue-next';
import { useTheme } from '@/shared/stores/composables/useTheme';

const { isDark, toggleTheme } = useTheme();
</script>
