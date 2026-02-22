import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast, { type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'

// Create app instance
const app = createApp(App)

// Initialize Pinia store
const pinia = createPinia()
app.use(pinia)

// Configure Toast plugin
const toastOptions: PluginOptions = {
  position: 'top-right' as any,
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  transition: 'Vue-Toastification__fade',
  maxToasts: 5,
  newestOnTop: true
}
app.use(Toast, toastOptions)

// Initialize auth store
import { useAuthStore } from '@/stores/auth.store'

// Mount app
app.use(router)
app.mount('#app')

// Initialize auth state after app is mounted
const authStore = useAuthStore()
authStore.initialize()

// Development tools
if (import.meta.env.DEV) {
  console.log('🚀 Biblioteca Frontend iniciado en modo desarrollo')
  console.log('🌐 API Base URL:', import.meta.env.VITE_API_BASE_URL)
  console.log('🔌 WebSocket URL:', import.meta.env.VITE_WS_URL)
}