<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const goHome = () => router.push('/')
const goBack = () => router.go(-1)
</script>

<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center px-4">
    <div class="text-center max-w-md">
      <div class="text-6xl font-bold text-danger-500 mb-4">403</div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">
        Acceso Denegado
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
        No tienes permisos para acceder a esta página.
        <span v-if="!authStore.isAuthenticated" class="block mt-2">
          Es necesario iniciar sesión.
        </span>
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="goBack"
          class="px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Volver atrás
        </button>
        <button
          @click="goHome"
          class="px-6 py-3 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
        >
          Ir al inicio
        </button>
      </div>
    </div>
  </div>
</template>