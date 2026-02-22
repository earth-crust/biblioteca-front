<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const libroId = route.params.id as string
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loading = ref(false)
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
      Detalle del Libro #{{ libroId }}
    </h1>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="space-y-4">
          <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
        
        <div class="space-y-6">
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
          
          <div class="pt-4">
            <div class="h-12 bg-primary-200 dark:bg-primary-800 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>