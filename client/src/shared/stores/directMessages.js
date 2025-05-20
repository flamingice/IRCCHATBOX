import { defineStore } from 'pinia';
import api from '@/services/api';
import { mapMessagesWithColors } from '@/shared/data-mappers/mapMessagesWithColors.js';

export const useDirectMessagesStore = defineStore('directMessages', {
  state: () => ({
    directMessages: [],
    hasFetchedMessages: false
  }),
  actions: {
    async fetchDMs(username) {
      try {
        this.hasFetchedMessages = false;
        const response = await api.get(`/dms/${username}`);
        this.messages = mapMessagesWithColors(response.data);
        this.hasFetchedMessages = true;
        return this.messages;
      } catch (err) {
        console.error('Failed to load direct messages:', err);
        this.messages = [];
      }
    },

    async sendDM(username, msg) {
      try {
        await api.post(`/dms/${username}`, {
          sender: 'you',
          ...msg
        });
        this.messages.push({ user: 'you', ...msg });
      } catch (err) {
        console.error('Failed to send direct message:', err);
      }
    }
  }
});
