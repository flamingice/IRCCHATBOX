<template>
  <div class=" border-l p-4 bg-white overflow-y-auto text-sm">
    <h3 class="text-sm font-semibold mb-4 text-gray-800">
      {{ totalUsers }} users online
    </h3>

    <div v-if="operators.length" class="text-xs text-gray-500 mb-1">Operators</div>
    <ul v-if="operators.length" class="mb-4 space-y-1">
      <li
          v-for="op in operators"
          :key="op"
          class="flex items-center gap-2 text-blue-600"
      >
        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
        @{{ op }}
      </li>
    </ul>

    <div class="text-xs text-gray-500 mb-1">Users</div>
    <ul class="space-y-1">
      <li
          v-for="user in users"
          :key="user"
          class="flex items-center gap-2 text-gray-800"
      >
        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
        {{ user }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const operators = ['alex', 'grace', 'trinity'];

const users = [
  'rocknrolla',
  'nina',
  'djmax',
  'vito',
  'emily',
  'neo',
  'sarah'
];

const totalUsers = operators.length + users.length;
</script>
