import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/models.types'
import { authService } from '@/services/auth.service'
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/utils/constants'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
  const refreshToken = ref<string | null>(localStorage.getItem(REFRESH_TOKEN_KEY))
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userFullName = computed(() => 
    user.value ? `${user.value.nombre} ${user.value.apellidos}`.trim() : ''
  )
  const userRole = computed(() => user.value?.roles?.[0] || null)

  // Actions
  async function login(email: string, password: string): Promise<void> {
    loading.value = true
    error.value = null
    
    try {
      const response = await authService.login({ email, password })
      
      // Store tokens (LoginResponse has token, refreshToken, user directly)
      token.value = response.token
      refreshToken.value = response.refreshToken || null
      user.value = response.user
      
      // Save to localStorage
      localStorage.setItem(TOKEN_KEY, token.value)
      if (refreshToken.value) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken.value)
      }
      
    } catch (err: any) {
      error.value = err.message || 'Error al iniciar sesión'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(userData: any): Promise<void> {
    loading.value = true
    error.value = null
    
    try {
      const response = await authService.register(userData)
      
      // After registration, we get a User directly (no tokens)
      // In a real app, registration might also return tokens
      // For now, assume registration doesn't auto-login
      user.value = response
      
      // Clear tokens until user logs in
      token.value = null
      refreshToken.value = null
      
    } catch (err: any) {
      error.value = err.message || 'Error al registrar usuario'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function refreshAuthToken(): Promise<void> {
    const currentRefreshToken = refreshToken.value
    if (!currentRefreshToken) {
      throw new Error('No refresh token available')
    }
    
    try {
      const response = await authService.refreshToken(currentRefreshToken)
      
      // Update tokens
      token.value = response.token
      refreshToken.value = response.refreshToken || null
      
      // Save to localStorage
      if (token.value) {
        localStorage.setItem(TOKEN_KEY, token.value)
      }
      if (refreshToken.value) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken.value)
      }
      
    } catch (err: any) {
      // If refresh fails, logout
      logout()
      throw err
    }
  }

  async function logout(): Promise<void> {
    try {
      await authService.logout()
    } catch (error) {
      // Ignore errors, still clear local state
    }
    
    // Clear state
    user.value = null
    token.value = null
    refreshToken.value = null
    
    // Clear localStorage
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    
    // Clear any other auth-related data
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }

  async function fetchProfile(): Promise<void> {
    if (!token.value) {
      throw new Error('No authentication token')
    }
    
    loading.value = true
    error.value = null
    
    try {
      const userProfile = await authService.getProfile()
      user.value = userProfile
    } catch (err: any) {
      error.value = err.message || 'Error al cargar perfil'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateProfile(userData: Partial<User>): Promise<void> {
    if (!token.value) {
      throw new Error('No authentication token')
    }
    
    loading.value = true
    error.value = null
    
    try {
      const updatedUser = await authService.updateProfile(userData)
      user.value = updatedUser
    } catch (err: any) {
      error.value = err.message || 'Error al actualizar perfil'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Initialize from localStorage
  function initialize(): void {
    if (token.value) {
      // Try to fetch profile if token exists
      fetchProfile().catch(() => {
        // If fetching profile fails, clear invalid token
        logout()
      })
    }
  }

  return {
    // State
    user,
    token,
    refreshToken,
    loading,
    error,
    
    // Getters
    isAuthenticated,
    userFullName,
    userRole,
    
    // Actions
    login,
    register,
    refreshAuthToken,
    logout,
    fetchProfile,
    updateProfile,
    initialize
  }
})