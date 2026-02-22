<script setup lang="ts">
import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loading = ref(false)
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
      Mis Préstamos
    </h1>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <div class="space-y-4">
        <div v-for="i in 3" :key="i" class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2 animate-pulse"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
      
      <div class="mt-8 text-center">
        <p class="text-gray-600 dark:text-gray-400">
          Gestión de préstamos en construcción.
        </p>
      </div>
    </div>
  </div>
</template>