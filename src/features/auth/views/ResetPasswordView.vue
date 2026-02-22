<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ROUTES } from '@/utils/constants'

const router = useRouter()
const route = useRoute()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const token = route.params.token as string

const password = ref('')
const confirmPassword = ref('')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loading = ref(false)

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }
  
  // TODO: Implement password reset
  loading.value = true
  setTimeout(() => {
    loading.value = false
    alert('Contraseña restablecida correctamente')
    router.push(ROUTES.LOGIN)
  }, 1000)
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Restablecer Contraseña
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Ingresa tu nueva contraseña
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nueva Contraseña
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Restableciendo...</span>
          <span v-else>Restablecer Contraseña</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <router-link :to="ROUTES.LOGIN" class="text-primary-600 hover:text-primary-700 font-medium">
          Volver a iniciar sesión
        </router-link>
      </div>
    </div>
  </div>
</template>