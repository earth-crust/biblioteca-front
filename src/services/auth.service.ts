import { apiService } from './api.service'
import type { LoginDTO, RegisterDTO, LoginResponse } from '@/types/api.types'
import type { User } from '@/types/models.types'

export class AuthService {
  /**
   * Iniciar sesión
   * @param credentials Credenciales de acceso
   * @returns Respuesta con token y usuario
   */
  async login(credentials: LoginDTO): Promise<LoginResponse> {
    return apiService.post<LoginResponse>('/login', credentials)
  }

  /**
   * Registrar nuevo usuario
   * @param data Datos de registro
   * @returns Usuario creado
   */
  async register(data: RegisterDTO): Promise<User> {
    return apiService.post<User>('/register', data)
  }

  /**
   * Obtener perfil del usuario autenticado
   * @returns Perfil del usuario
   */
  async getProfile(): Promise<User> {
    return apiService.get<User>('/user/profile')
  }

  /**
   * Refrescar token de acceso
   * @param refreshToken Token de refresco
   * @returns Nueva respuesta de autenticación
   */
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    return apiService.post<LoginResponse>('/refresh-token', { refreshToken })
  }

  /**
   * Cerrar sesión (opcional - llamada a endpoint si existe)
   * @returns Promesa vacía
   */
  async logout(): Promise<void> {
    // Llamada opcional a endpoint de logout si existe
    try {
      await apiService.post('/logout')
    } catch (error) {
      // Ignorar errores en logout (puede que no exista el endpoint)
      console.debug('Logout endpoint optional')
    }
  }

  /**
   * Cambiar contraseña
   * @param currentPassword Contraseña actual
   * @param newPassword Nueva contraseña
   * @returns Promesa vacía
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    return apiService.post<void>('/auth/change-password', { currentPassword, newPassword })
  }

  /**
   * Solicitar restablecimiento de contraseña
   * @param email Email del usuario
   * @returns Promesa vacía
   */
  async forgotPassword(email: string): Promise<void> {
    return apiService.post<void>('/auth/forgot-password', { email })
  }

  /**
   * Restablecer contraseña con token
   * @param token Token de restablecimiento
   * @param password Nueva contraseña
   * @returns Promesa vacía
   */
  async resetPassword(token: string, password: string): Promise<void> {
    return apiService.post<void>('/auth/reset-password', { token, password })
  }

  /**
   * Actualizar perfil de usuario
   * @param userData Datos a actualizar
   * @returns Usuario actualizado
   */
  async updateProfile(userData: Partial<User>): Promise<User> {
    return apiService.put<User>('/user/profile', userData)
  }
}

export const authService = new AuthService()