<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-md transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
    aria-label="Toggle theme"
  >
    <Sun v-if="isDark" class="h-5 w-5 text-yellow-500" />
    <Moon v-else class="h-5 w-5 text-gray-700" />
  </button>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Moon, Sun } from 'lucide-vue-next';

// Create a reactive reference to track dark mode state
const isDark = ref(false);

// Function to toggle between light and dark themes
const toggleTheme = () => {
  isDark.value = !isDark.value;
  updateTheme();
};

// Function to update the theme based on isDark value
const updateTheme = () => {
  // Update document class
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Save preference to localStorage
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

// Initialize theme on component mount
onMounted(() => {
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
  } else {
    // Check system preference
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Apply initial theme
  updateTheme();

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      isDark.value = e.matches;
      updateTheme();
    }
  });
});
</script>

<style>
/* Add these styles to your main CSS file or App.vue */
/*
:root {
  --background-color: #ffffff;
  --text-color: #1a202c;
}

.dark {
  --background-color: #1a202c;
  --text-color: #f7fafc;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
*/
</style>
