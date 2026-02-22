// API response types
export interface ApiResponse<T = any> {
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
  status?: number
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