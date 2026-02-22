<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { ROUTES } from '@/utils/constants'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const nombre = ref('')
const apellidos = ref('')
const loading = ref(false)

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }
  
  try {
    loading.value = true
    await authStore.register({
      email: email.value,
      password: password.value,
      nombre: nombre.value,
      apellidos: apellidos.value
    })
    router.push(ROUTES.HOME)
  } catch (error) {
    console.error('Registration failed:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Crear Cuenta
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Regístrate para acceder a la biblioteca
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nombre
          </label>
          <input
            id="nombre"
            v-model="nombre"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label for="apellidos" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Apellidos
          </label>
          <input
            id="apellidos"
            v-model="apellidos"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            placeholder="Tus apellidos"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Correo Electrónico
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contraseña
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
          <span v-if="loading">Cargando...</span>
          <span v-else>Crear Cuenta</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          ¿Ya tienes cuenta?
          <router-link :to="ROUTES.LOGIN" class="text-primary-600 hover:text-primary-700 font-medium">
            Inicia sesión aquí
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>