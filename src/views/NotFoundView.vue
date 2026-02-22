<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => router.push('/')
</script>

<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center px-4">
    <div class="text-center max-w-md">
      <div class="text-6xl font-bold text-primary-500 mb-4">404</div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">
        Página no encontrada
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <button
        @click="goHome"
        class="px-6 py-3 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-md"
      >
        Volver al inicio
      </button>
    </div>
  </div>
</template>