<template>
  <div class="flex flex-col h-full">
    <!-- DMs Accordion -->
    <div @click="showDMs = !showDMs" class="cursor-pointer flex justify-between items-center mb-1">
      <h2 class="text-xl font-bold">Direct Messages</h2>
      <span class="text-gray-500">{{ showDMs ? '−' : '+' }}</span>
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
        >•</span>
      </li>
    </ul>

    <!-- Bottom Add DM Button -->
    <div class="relative mt-auto">
      <button
          @click="toggleDMPopover"
          class="mt-4 w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 fill-current" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"/>
        </svg>
        <span class="leading-none">Add DM</span>
      </button>

      <div
          v-if="showDMPopover"
          class="absolute bottom-12 left-0 z-50 bg-white border rounded shadow-lg p-4 w-full"
      >
        <h3 class="text-sm font-semibold mb-2">New DM</h3>
        <input
            v-model="newDMUser"
            type="text"
            placeholder="e.g. alice"
            class="w-full px-2 py-1 border rounded mb-2 text-sm"
        />
        <div class="flex flex-col">
          <div class="flex justify-end gap-2">
            <button @click="hideDMPopover" class="text-xs px-2 py-1 bg-gray-200 rounded">Cancel</button>
            <button @click="createDM" class="text-xs px-2 py-1 bg-purple-600 text-white rounded">
              Create
            </button>
          </div>
          <p v-if="errorMessage" class="text-red-500 text-xs mt-2">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';
import { setLastViewed, hasUnread } from '@/helpers/storage';

const router = useRouter();
const route = useRoute();

const dmUsers = ref([]);
const showDMs = ref(true);
const showDMPopover = ref(false);
const activeUser = computed(() => route.params.user);
const newDMUser = ref('');
const latestDMTimestamps = ref({});
const errorMessage = ref('');

const fetchDMUsers = async () => {
  try {
    const response = await api.get('/dms');
    dmUsers.value = response.data;
  } catch (err) {
    console.error('Failed to load DM users:', err);
  }
};

const fetchLatestTimestamps = async () => {
  try {
    const response = await api.get('/channels/latest');
    latestDMTimestamps.value = response.data.dms || {};
  } catch (err) {
    console.error('Failed to load latest DM timestamps:', err);
  }
};

const goToDM = (user) => {
  setLastViewed(`dm:${user}`);
  router.push(`/dm/${user}`);
};

const toggleDMPopover = () => {
  showDMPopover.value = !showDMPopover.value;
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
    await fetchDMUsers();
    hideDMPopover();
    router.push(`/dm/${name}`);
  } catch (err) {
    errorMessage.value = err.response?.data?.error || 'Failed to create DM.';
  }
};

onMounted(() => {
  fetchDMUsers();
  fetchLatestTimestamps();
});

</script>
