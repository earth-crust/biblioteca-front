// API response types
export interface ApiResponse<T = any> {
  data: T
  message?: string
  meta?: PaginationMeta
  success: boolean
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
  timestamp: string
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
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