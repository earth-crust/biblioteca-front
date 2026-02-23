<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useUIStore } from '@/stores/ui.store'

const authStore = useAuthStore()
const uiStore = useUIStore()

onMounted(() => {
  authStore.initializeAuth()
  uiStore.initializeTheme()
  
  // Si hay token, cargar perfil
  if (authStore.token) {
    authStore.fetchProfile()
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <!-- App Header -->
    <header class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">
              Biblioteca
            </h1>
            <nav class="hidden md:flex space-x-4">
              <router-link 
                to="/" 
                class="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                active-class="text-primary-600 dark:text-primary-400 font-semibold"
              >
                Inicio
              </router-link>
              <router-link 
                to="/catalogo" 
                class="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                active-class="text-primary-600 dark:text-primary-400 font-semibold"
              >
                Catálogo
              </router-link>
            </nav>
          </div>
          
          <div class="flex items-center space-x-4">
            <div v-if="authStore.isAuthenticated" class="flex items-center space-x-3">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {{ authStore.userFullName }}
              </span>
              <button 
                @click="authStore.logout"
                class="px-4 py-2 text-sm font-medium text-danger-600 hover:text-danger-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
            <div v-else class="flex items-center space-x-3">
              <router-link 
                to="/login" 
                class="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Iniciar Sesión
              </router-link>
              <router-link 
                to="/register" 
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
              >
                Registrarse
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- App Footer -->
    <footer class="mt-12 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Biblioteca Digital</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Sistema de gestión de libros y préstamos
            </p>
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            © {{ new Date().getFullYear() }} Sistema de Gestión de Biblioteca. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>