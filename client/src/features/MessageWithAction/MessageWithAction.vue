<script setup>
import { formatTime } from '@/shared/libs/utils/time';
import Info from '@/shared/ui/UserPopover/Info.vue';
import Stats from '@/shared/ui/UserPopover/Stats.vue';
import Message from '@/entities/message/ui/Message.vue';
import FollowButton from '@/shared/ui/UserPopover/FollowButton.vue';
import Bio from '@/shared/ui/UserPopover/Bio.vue';
import Profile from '@/shared/ui/UserPopover/Profile.vue';
import TriggerWithCard from '@/entities/TriggerWithCard/ui/TriggerWithCard.vue';

defineProps({
  timestamp: Number,
  text: String,
  user: String,
  color: String,
  index: Number,
  activePickerIndex: Number,
  togglePicker: Function
});
</script>

<template>
  <div v-if="user === 'system'" class="text-gray-500 italic">
    <span class="dark:text-white/70 text-gray-400 w-[70px] inline-block">{{
      formatTime(timestamp)
    }}</span>
    * {{ text }}
  </div>

  <template v-else>
    <div class="flex items-center gap-1 group">
      <!-- time -->
      <span class="dark:text-white text-gray-600 w-[70px] inline-block">{{
        formatTime(timestamp)
      }}</span>
      <span class="text-black dark:text-white">|</span>
      <!-- row -->
      <div class="flex rounded-md py-1 hover:bg-gray-300 dark:hover:bg-gray-700">
        <div class="ml-2 flex items-center">
          <!-- username -->
          <TriggerWithCard
            :user="{
              username: user,
              name: user
            }"
            :username="user"
          >
            <template #username>
              <span class="font-bold" :style="{ color: color || '#000' }"> {{ user }}: </span>
            </template>
            <div class="flex flex-col items-start w-28 gap-2.5">
              <Profile :name="user" :src="`https://i.pravatar.cc/150?u=${user}`" />
              <Info :name="user" :username="user" />
              <FollowButton
                class="row-start-2 row-end-3"
                :follow-user="user"
                :is-following="false"
              />
            </div>
            <div class="gap-4 flex flex-col">
              <Bio :bio="text" />
              <Stats
                :followers="Math.floor(Math.random() * 20)"
                :posts="Math.floor(Math.random() * 20)"
                :following="Math.floor(Math.random() * 20)"
              />
            </div>
          </TriggerWithCard>

          <!-- message -->
          <Message
            :text="text"
            :index="index"
            :activePickerIndex="activePickerIndex"
            @toggle-picker="togglePicker"
          />
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped></style>
