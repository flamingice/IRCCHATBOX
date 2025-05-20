import { defineStore } from 'pinia';
import api from '@/services/api';
import { mapMessagesWithColors } from '@/shared/data-mappers/mapMessagesWithColors.js';

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [],
    hasFetchedMessages: false
  }),
  actions: {
    async fetchMessages(channelName) {
      try {
        this.hasFetchedMessages = false;
        const response = await api.get(`/channels/${channelName}`);
        this.messages = mapMessagesWithColors(response.data);
        this.hasFetchedMessages = true;
        return this.messages;
      } catch (err) {
        console.error('Failed to load messages:', err);
        this.messages = [];
      } finally {
      }
    }
  }
});
