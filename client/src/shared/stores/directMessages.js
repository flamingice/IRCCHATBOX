import { defineStore } from 'pinia';
import api from '@/services/api';
import { mapMessagesWithColors } from '@/shared/data-mappers/mapMessagesWithColors';

export const useDirectMessagesStore = defineStore('directMessages', {
  state: () => ({
    directMessages: [],
    dmUsers: [],
    hasFetchedMessages: false,
    latestDMTimestamps: []
  }),
  actions: {
    async fetchDMs(username, isDark) {
      try {
        if (!username) {
          return [];
        }
        this.hasFetchedMessages = false;
        const response = await api.get(`/dms/${username}`);
        this.directMessages = mapMessagesWithColors(response.data, isDark);
        this.hasFetchedMessages = true;
        return this.directMessages;
      } catch (err) {
        console.error('Failed to load direct messages:', err);
        this.directMessages = [];
      }
    },
    async fetchLatestTimestamps() {
      try {
        const response = await api.get('/channels/latest');
        this.latestDMTimestamps = response.data.dms || {};

        return this.latestDMTimestamps;
      } catch (err) {
        console.error('Failed to load latest timestamps:', err);
      } finally {
      }
    },
    async fetchDMUsers() {
      try {
        const response = await api.get('/dms');
        this.dmUsers = response.data;
      } catch (err) {
        console.error('Failed to load DM users:', err);
      }
    },
    async sendDM(username, msg) {
      try {
        await api.post(`/dms/${username}`, {
          sender: 'you',
          ...msg
        });
        this.directMessages = [...this.directMessages, { user: 'you', ...msg }];
      } catch (err) {
        console.error('Failed to send direct message:', err);
      }
    }
  },
  getters: {
    getDirectMessages(state) {
      return state.directMessages;
    },
    getDMUsers(state) {
      return state.dmUsers;
    },
    getLatestTimestamps(state) {
      return state.latestDMTimestamps;
    }
  }
});
