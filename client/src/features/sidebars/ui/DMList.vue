<template>
  <div class="flex flex-col h-full">
    <!-- DMs Accordion -->
    <div class="cursor-pointer flex justify-between items-center gap-1">
      <div @click="showDMs = !showDMs" class="w-full">
        <h2 class="text-xl font-bold">Direct Messages</h2>
      </div>

      <div class="relative ml-1">
        <button
          @click="toggleDMPopover"
          class="w-full text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <div
          v-if="showDMPopover"
          class="absolute top-7 left-0 z-50 bg-white border rounded shadow-lg p-4 w-max"
        >
          <h3 class="text-sm font-semibold mb-2">New DM</h3>
          <input
            ref="newDMInput"
            v-model="newDMUser"
            type="text"
            placeholder="e.g. alice"
            class="w-full px-2 py-1 border rounded mb-2 text-sm"
            @keyup.enter="createDM"
          />
          <div class="flex flex-col">
            <div class="flex justify-end gap-2">
              <button @click="hideDMPopover" class="text-xs px-2 py-1 bg-gray-200 rounded">
                Cancel
              </button>
              <button @click="createDM" class="text-xs px-2 py-1 bg-purple-600 text-white rounded">
                Create
              </button>
            </div>
            <p v-if="errorMessage" class="text-red-500 text-xs mt-2">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <ul v-if="showDMs" class="flex-1 overflow-auto mb-4">
      <li
        v-for="user in dmUsers"
        :key="user"
        @click="goToDM(user)"
        :class="[
          'cursor-pointer px-2 py-1 rounded hover:bg-gray-200 flex justify-between',
          user === activeUser ? 'font-bold text-black' : 'text-gray-800'
        ]"
      >
        <span>@ {{ user }}</span>
        <span
          v-if="latestDMTimestamps[user] && hasUnread(`dm:${user}`, latestDMTimestamps[user])"
          class="text-purple-500 font-bold"
          >•</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api.js';
import { setLastViewed, hasUnread } from '@/helpers/storage.js';
import { useDirectMessagesStore } from '@/shared/stores/directMessages.js';
import { useChannelsStore } from '@/shared/stores/channels.js';
import { CHAT_TYPES } from '@/shared/constants/chat.js';

const router = useRouter();
const route = useRoute();

const showDMs = ref(true);
const showDMPopover = ref(false);
const activeUser = computed(() => route.params.name);
const chat = computed(() => route.params.chat);
const newDMUser = ref('');
const newDMInput = ref(null);
const errorMessage = ref('');

const DMStore = useDirectMessagesStore();
const channelStore = useChannelsStore();
const latestDMTimestamps = computed(() => DMStore.getLatestTimestamps);
const dmUsers = computed(() => DMStore.getDMUsers);

const goToDM = (user) => {
  setLastViewed(`${CHAT_TYPES.DM}:${user}`);
  router.push(`/${CHAT_TYPES.DM}/${user}`);
};

const toggleDMPopover = async () => {
  showDMPopover.value = !showDMPopover.value;

  if (showDMPopover.value) {
    await nextTick(); // wait for DOM to update
    newDMInput.value?.focus();
  }
};

const hideDMPopover = () => {
  showDMPopover.value = false;
  newDMUser.value = '';
  errorMessage.value = '';
};

const createDM = async () => {
  const name = newDMUser.value.trim();
  errorMessage.value = ''; // Reset error

  if (!name) {
    errorMessage.value = 'Username is required.';
    return;
  }

  if (dmUsers.value.includes(name)) {
    errorMessage.value = 'DM with this user already exists.';
    return;
  }

  try {
    await api.post('/dms', { name });
    hideDMPopover();
    router.push(`/${CHAT_TYPES.DM}/${name}`);
  } catch (err) {
    errorMessage.value = err.response?.data?.error || 'Failed to create DM.';
  }
};
onMounted(() => {});
watch([chat, activeUser], () => {
  setLastViewed(`${chat.value}:${activeUser.value}`);
  DMStore.fetchLatestTimestamps();
  channelStore.fetchLatestTimestamps();
});
</script>
