<template>
  <nav class="flex items-center justify-between px-4 py-4 border-b bg-white">
    <div class="flex items-center gap-2">
      <!-- Increase logo size -->
      <img src="/ircchatboxlogo.png" class="h-12 w-auto" alt="logo" />
    </div>
    <div class="flex gap-6 text-sm text-gray-600">
      <template v-for="link in navLinks" :key="link.to">
        <!-- Dummy links (no routing) -->
        <span
            v-if="link.disabled"
            class="hover:underline cursor-pointer text-gray-400"
            @click.prevent
        >
          {{ link.label }}
        </span>

        <!-- Real links -->
        <RouterLink
            v-else
            :to="link.to"
            :class="[
            isActive(link.url)
              ? 'font-bold text-black underline'
              : 'hover:underline'
          ]"
        >
          {{ link.label }}
        </RouterLink>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()

const navLinks = [
  { label: 'Chat Rooms', to: '/channel/general', url: '/channel/' },
  { label: 'Direct Messages', to: '/dm/djmax', url: '/dm/' },
  { label: 'Help', to: '/help', disabled: true },
  { label: 'About', to: '/about', disabled: true },
  { label: 'Login', to: '/login', disabled: true }
]

const isActive = (path) => route.path.includes(path)

</script>
