<template>
  <div class="flex flex-col h-screen">
    <TopNav />
    <div class="flex flex-1 overflow-hidden">
      <LeftSidebar />

      <div class="flex flex-col flex-1 overflow-hidden">
        <router-view />
      </div>

      <RightSidebar :users="rightSidebarUsers" />
    </div>
  </div>
</template>

<script setup>
import TopNav from '@/components/Layout/TopNav.vue';
import LeftSidebar from '@/widgets/LeftSidebar.vue';
import RightSidebar from '@/components/Layout/RightSidebar.vue';
import { inject } from 'vue';

const rightSidebarUsers = inject('rightSidebarUsers', []);
</script>
