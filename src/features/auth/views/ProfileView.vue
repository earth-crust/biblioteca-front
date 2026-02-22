<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
const loading = ref(false)
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
      Mi Perfil
    </h1>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-1">
          <div class="h-48 w-48 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
        </div>
        
        <div class="md:col-span-2 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2 animate-pulse"></div>
              <div class="h-10 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2 animate-pulse"></div>
              <div class="h-10 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
          
          <div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2 animate-pulse"></div>
            <div class="h-10 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          
          <div class="pt-4">
            <div class="h-12 bg-primary-200 dark:bg-primary-800 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>