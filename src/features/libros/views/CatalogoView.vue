<script setup lang="ts">
import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loading = ref(false)
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
      Catálogo de Libros
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Placeholder for book cards -->
      <div v-for="i in 6" :key="i" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 animate-pulse"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4 animate-pulse"></div>
        <div class="h-10 bg-primary-200 dark:bg-primary-800 rounded animate-pulse"></div>
      </div>
    </div>
    
    <div class="mt-8 text-center">
      <p class="text-gray-600 dark:text-gray-400">
        Catálogo en construcción. Próximamente disponible.
      </p>
    </div>
  </div>
</template>