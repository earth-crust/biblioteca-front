<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
      Panel de Administración
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="i in 4" :key="i" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2 animate-pulse"></div>
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <p class="text-gray-600 dark:text-gray-400 text-center">
        Panel de administración en construcción.
      </p>
    </div>
  </div>
</template>