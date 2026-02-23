import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/models.types'
import type { LoginDTO, RegisterDTO, LoginResponse } from '@/types/api.types'
import { UserRole } from '@/types/enums'
import { authService } from '@/services/auth.service'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  
  const isAdmin = computed(() => 
    user.value?.roles.includes(UserRole.ADMIN) ?? false
  )
  
  const isBibliotecario = computed(() =>
    user.value?.roles.includes(UserRole.BIBLIOTECARIO) ?? false
  )
  
  const canAccessAdmin = computed(() => isAdmin.value || isBibliotecario.value)
  
  const userFullName = computed(() => 
    user.value ? `${user.value.nombre} ${user.value.apellidos}` : ''
  )

  // Actions
  async function login(credentials: LoginDTO): Promise<void> {
    loading.value = true
    error.value = null
    
    try {
      const response: LoginResponse = await authService.login(credentials)
      setAuth(response.token, response.user)
    } catch (err) {
      error.value = 'Credenciales inválidas'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(data: RegisterDTO): Promise<void> {
    loading.value = true
    error.value = null
    
    try {
      const newUser = await authService.register(data)
      // Después del registro, hacer login automáticamente
      await login({ email: data.email, password: data.password })
    } catch (err) {
      error.value = 'Error al registrar usuario'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchProfile(): Promise<void> {
    if (!token.value) return
    
    loading.value = true
    try {
      const profile = await authService.getProfile()
      user.value = profile
      localStorage.setItem(USER_KEY, JSON.stringify(profile))
    } catch (err) {
      logout()
      throw err
    } finally {
      loading.value = false
    }
  }

  function setAuth(newToken: string, newUser: User): void {
    token.value = newToken
    user.value = newUser
    localStorage.setItem(TOKEN_KEY, newToken)
    localStorage.setItem(USER_KEY, JSON.stringify(newUser))
  }

  function logout(): void {
    token.value = null
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  function initializeAuth(): void {
    const savedUser = localStorage.getItem(USER_KEY)
    if (savedUser && token.value) {
      user.value = JSON.parse(savedUser)
    }
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    // Getters
    isAuthenticated,
    isAdmin,
    isBibliotecario,
    canAccessAdmin,
    userFullName,
    // Actions
    login,
    register,
    fetchProfile,
    logout,
    initializeAuth
  }
})
