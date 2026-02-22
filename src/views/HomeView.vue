<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { ROUTES } from '@/utils/constants'

const authStore = useAuthStore()
</script>

<template>
  <div class="space-y-8">
    <!-- Hero Section -->
    <section class="text-center py-12 px-4">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Bienvenido a la Biblioteca Digital
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
        Explora nuestra colección de libros, gestiona tus préstamos y descubre nuevos títulos.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          :to="ROUTES.CATALOGO"
          class="px-8 py-3 text-lg font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-md"
        >
          Explorar Catálogo
        </router-link>
        
        <router-link
          v-if="!authStore.isAuthenticated"
          :to="ROUTES.REGISTER"
          class="px-8 py-3 text-lg font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors border border-primary-200"
        >
          Registrarse Gratis
        </router-link>
      </div>
    </section>

    <!-- Features -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Amplia Colección</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Miles de libros disponibles en diferentes categorías y géneros.
        </p>
      </div>
      
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Préstamos Fáciles</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Reserva y renueva libros con solo unos clics desde cualquier dispositivo.
        </p>
      </div>
      
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Soporte en Línea</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Chat en tiempo real con bibliotecarios para resolver tus dudas.
        </p>
      </div>
    </section>

    <!-- Stats -->
    <section v-if="authStore.isAuthenticated" class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
      <h2 class="text-2xl font-bold mb-6">Tu Actividad</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold">0</div>
          <div class="text-sm opacity-90">Libros Prestados</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold">0</div>
          <div class="text-sm opacity-90">Reservas Activas</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold">0</div>
          <div class="text-sm opacity-90">Días Restantes</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold">0</div>
          <div class="text-sm opacity-90">Notificaciones</div>
        </div>
      </div>
    </section>
  </div>
</template>