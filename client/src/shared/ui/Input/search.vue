<template>
  <div class="chat-search-container my-2">
    <!-- Search input -->
    <div class="search-input-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for channels or people..."
        class="search-input"
        @focus="isSearchActive = true"
        @blur="handleBlur"
      />
      <button v-if="searchQuery" @click="clearSearch" class="clear-button">
        <XIcon class="h-4 w-4 text-gray-400" />
      </button>
      <SearchIcon v-else class="h-4 w-4 text-gray-400 search-icon" />
    </div>

    <!-- Search results -->
    <div
      v-if="isSearchActive && (filteredChannels.length > 0 || filteredDirectMessages.length > 0)"
      class="search-results"
    >
      <!-- Channels section -->
      <div v-if="filteredChannels.length > 0" class="result-section">
        <h3 class="section-title">Channels</h3>
        <ul class="result-list">
          <li
            v-for="channel in filteredChannels"
            :key="channel.id"
            class="result-item"
            @click="selectChannel(channel)"
          >
            <div class="channel-icon">#</div>
            <div class="result-name">{{ channel.name }}</div>
          </li>
        </ul>
      </div>

      <!-- Direct Messages section -->
      <div v-if="filteredDirectMessages.length > 0" class="result-section">
        <h3 class="section-title">Direct Messages</h3>
        <ul class="result-list">
          <li
            v-for="user in filteredDirectMessages"
            :key="user.id"
            class="result-item"
            @click="selectDirectMessage(user)"
          >
            <div class="user-status" :class="{ online: user.isOnline }"></div>
            <div class="result-name">@{{ user.name }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { SearchIcon, XIcon } from 'lucide-vue-next';

// Props
const props = defineProps({
  channels: {
    type: Array,
    default: () => []
  },
  directMessages: {
    type: Array,
    default: () => []
  }
});

// Emits
const emit = defineEmits(['select-channel', 'select-direct-message']);

// State
const searchQuery = ref('');
const isSearchActive = ref(false);
const blurTimeout = ref(null);

// Computed properties
const filteredChannels = computed(() => {
  if (!searchQuery.value) return props.channels;
  return props.channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const filteredDirectMessages = computed(() => {
  if (!searchQuery.value) return props.directMessages;
  return props.directMessages.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Methods
const clearSearch = () => {
  searchQuery.value = '';
};

const handleBlur = () => {
  blurTimeout.value = setTimeout(() => {
    isSearchActive.value = false;
  }, 200);
};

const selectChannel = (channel) => {
  emit('select-channel', channel);
  isSearchActive.value = false;
  clearSearch();
};

const selectDirectMessage = (user) => {
  emit('select-direct-message', user);
  isSearchActive.value = false;
  clearSearch();
};

// Clean up
watch(
  () => isSearchActive.value,
  (newValue) => {
    if (newValue && blurTimeout.value) {
      clearTimeout(blurTimeout.value);
    }
  }
);
</script>

<style scoped>
.chat-search-container {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 8px 32px 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #3b82f6;
}

.search-icon {
  position: absolute;
  right: 10px;
  pointer-events: none;
}

.clear-button {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  margin-top: 4px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 10;
  max-height: 400px;
  overflow-y: auto;
}

.section-title {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  padding: 8px 12px;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  margin: 0;
}

.result-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.result-item:hover {
  background-color: #f1f5f9;
}

.channel-icon {
  font-weight: bold;
  color: #3b82f6;
  margin-right: 8px;
}

.user-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #cbd5e1;
  margin-right: 8px;
}

.user-status.online {
  background-color: #10b981;
}

.result-name {
  font-size: 14px;
  color: #334155;
}

.result-section:not(:last-child) {
  border-bottom: 1px solid #e2e8f0;
}
</style>
