import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import type { ApiResponse, ApiError } from '@/types/api.types'
import { useAuthStore } from '@/stores/auth.store'

export class ApiService {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const authStore = useAuthStore()
        
        if (authStore.token) {
          config.headers.Authorization = `Bearer ${authStore.token}`
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      async (error) => {
        const originalRequest = error.config

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          const authStore = useAuthStore()
          
          try {
            // Try to refresh token
            await authStore.refreshAuthToken()
            
            // Retry original request with new token
            if (authStore.token) {
              originalRequest.headers.Authorization = `Bearer ${authStore.token}`
            }
            
            return this.instance(originalRequest)
          } catch (refreshError) {
            // Refresh failed, logout user
            await authStore.logout()
            window.location.href = '/login'
            return Promise.reject(refreshError)
          }
        }

        // Handle other errors
        if (error.response?.status === 403) {
          // Forbidden - redirect to forbidden page
          window.location.href = '/forbidden'
        }

        // Convert error to standardized format
        const apiError: ApiError = {
          message: error.response?.data?.message || 'An unexpected error occurred',
          status: error.response?.status || 500,
          errors: error.response?.data?.errors || {},
          timestamp: new Date().toISOString()
        }

        return Promise.reject(apiError)
      }
    )
  }

  // HTTP methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get<ApiResponse<T>>(url, config)
    return response.data
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config)
    return response.data
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config)
    return response.data
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.patch<ApiResponse<T>>(url, data, config)
    return response.data
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config)
    return response.data
  }

  // Raw axios instance for custom requests
  get axiosInstance(): AxiosInstance {
    return this.instance
  }
}

// Singleton instance
export const apiService = new ApiService()