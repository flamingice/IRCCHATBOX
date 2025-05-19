<template>
  <div class="border-l p-4 bg-white overflow-y-auto text-sm">
    <h3 class="text-sm font-semibold mb-4 text-gray-800">
      <span v-if="isDM">Direct Chat</span>
      <span v-else>{{ users.length }} participants</span>
    </h3>

    <ul class="space-y-1">
      <li v-for="user in users" :key="user" class="flex items-center gap-2 text-gray-800">
        <span
          :class="['w-2 h-2 rounded-full', onlineUsers.has(user) ? 'bg-green-500' : 'bg-gray-300']"
        ></span>
        {{ user }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
});

const onlineUsers = new Set(['emily', 'djmax', 'grace', 'tyler', 'you']);

// Determine if this is a direct chat (2 users only)
const isDM = computed(() => props.users.length === 2);
</script>
