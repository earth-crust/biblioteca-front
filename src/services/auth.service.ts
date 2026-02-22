import { apiService } from './api.service'
import type { User } from '@/types/models.types'
import type { ApiResponse } from '@/types/api.types'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  nombre: string
  apellidos: string
  telefono?: string
  direccion?: string
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export class AuthService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>('/auth/login', credentials)
  }

  async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>('/auth/register', userData)
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>('/auth/refresh', { refreshToken })
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return apiService.get<User>('/auth/profile')
  }

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return apiService.put<User>('/auth/profile', userData)
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    return apiService.post<void>('/auth/change-password', { currentPassword, newPassword })
  }

  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return apiService.post<void>('/auth/forgot-password', { email })
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse<void>> {
    return apiService.post<void>('/auth/reset-password', { token, password })
  }

  async logout(): Promise<ApiResponse<void>> {
    return apiService.post<void>('/auth/logout')
  }
}

export const authService = new AuthService()