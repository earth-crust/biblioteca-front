<script setup lang="ts">
import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loading = ref(false)
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
      Mensajes
    </h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
          <div class="space-y-3">
            <div v-for="i in 5" :key="i" class="p-3 border border-gray-200 dark:border-gray-700 rounded">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full">
          <div class="h-64 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
            <p class="text-gray-500 dark:text-gray-400">
              Selecciona una conversación para comenzar
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>