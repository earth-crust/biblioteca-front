import type { User } from './models.types'
import type { PrestamoEstado } from './enums'

// Respuestas de API
export interface ApiResponse<T> {
  data: T
  message?: string
  status: number
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status: number
  timestamp?: string
}

// DTOs para requests
export interface RegisterDTO {
  email: string
  password: string
  nombre: string
  apellidos: string
  telefono?: string
}

export interface LoginDTO {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  refreshToken?: string
  user: User
}

export interface CreateLibroDTO {
  isbn?: string
  titulo: string
  descripcion: string
  numeroCopias: number
  añoPublicacion: number
  imagen?: string
  editorial: string
  categoriaId: number
  autorId: number
}

export interface UpdateLibroDTO extends Partial<CreateLibroDTO> {
  id: number
}

export interface CreatePrestamoDTO {
  libroId: number
}

export interface CreateMensajeDTO {
  destinatarioId: number
  contenido: string
  prestamoId?: number
}

export interface LibroFilters {
  page?: number
  limit?: number
  search?: string
  categoriaId?: number
  autorId?: number
  disponible?: boolean
}

export interface PrestamoFilters {
  page?: number
  estado?: PrestamoEstado
  usuarioId?: number
}

// Tipos existentes para compatibilidad
export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// HTTP methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

// Request options
export interface RequestOptions {
  headers?: Record<string, string>
  params?: Record<string, any>
  timeout?: number
}

// Socket events
export interface SocketEvent {
  type: string
  payload: any
  timestamp: number
}