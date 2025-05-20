import { defineStore } from 'pinia';
import api from '@/services/api.js';

export const useChannelsStore = defineStore('channels', {
  state: () => ({
    channels: [],
    hasFetched: false,
    latestChannelTimestamps: {}
  }),
  actions: {
    async fetchChannels() {
      try {
        this.hasFetched = false;
        const response = await api.get('/channels');
        this.channels = response.data;
        this.hasFetched = true;
      } catch (e) {
        console.error(e);
      } finally {
        this.hasFetched = true;
      }
    },
    async fetchLatestTimestamps() {
      try {
        this.hasFetched = false;
        const response = await api.get('/channels/latest');
        this.latestChannelTimestamps = response.data.channels || {};
        this.hasFetched = true;
      } catch (err) {
        console.error('Failed to load latest timestamps:', err);
      } finally {
        this.hasFetched = true;
      }
    },
    getChannelTimestamp(channelName) {
      return this.latestChannelTimestamps[channelName] || null;
    }
  },
  getters: {
    getChannels: (state) => {
      return state.channels;
    },
    getChannelName: (state) => {
      return (channelSlug) => channelSlug;
    }
  }
});
