import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { ApiResponse, ApiError } from '@/types/api.types'
import { useAuthStore } from '@/stores/auth.store'
import { useToast } from '@/composables/useToast'
import router from '@/router'

export class ApiService {
  private axiosInstance: AxiosInstance
  private toast = useToast()

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const authStore = useAuthStore()
        if (authStore.token) {
          config.headers.Authorization = `Bearer ${authStore.token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        this.handleError(error)
        return Promise.reject(error)
      }
    )
  }

  private handleError(error: AxiosError<ApiError>): void {
    if (!error.response) {
      this.toast.error('Error de conexión. Verifica tu internet.')
      return
    }

    const { status, data } = error.response

    switch (status) {
      case 401:
        const authStore = useAuthStore()
        authStore.logout()
        router.push('/login')
        this.toast.error('Sesión expirada. Por favor inicia sesión.')
        break
      case 403:
        this.toast.error('No tienes permisos para realizar esta acción.')
        break
      case 404:
        this.toast.error('Recurso no encontrado.')
        break
      case 422:
        // Errores de validación (se manejan en componentes)
        break
      case 500:
        this.toast.error('Error del servidor. Intenta más tarde.')
        break
      default:
        this.toast.error(data?.message || 'Ha ocurrido un error.')
    }
  }

  // Métodos genéricos con tipos
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(url, config)
    return response.data.data
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(url, data, config)
    return response.data.data
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<ApiResponse<T>>(url, data, config)
    return response.data.data
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<ApiResponse<T>>(url, data, config)
    return response.data.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<ApiResponse<T>>(url, config)
    return response.data.data
  }

  // Para descarga de archivos
  async downloadFile(url: string, filename: string): Promise<void> {
    const response = await this.axiosInstance.get(url, { responseType: 'blob' })
    const blob = new Blob([response.data])
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
    URL.revokeObjectURL(link.href)
  }

  // Raw axios instance for custom requests
  get axios(): AxiosInstance {
    return this.axiosInstance
  }
}

export const apiService = new ApiService()