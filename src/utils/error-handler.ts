import type { AxiosError } from 'axios'
import type { ApiError } from '@/types/api.types'

/**
 * Extrae el mensaje de error de cualquier tipo de error
 * @param error Error de cualquier tipo
 * @returns Mensaje de error legible
 */
export function extractErrorMessage(error: unknown): string {
  // Verificar si es un error de Axios
  const axiosError = error as AxiosError<ApiError>
  if (axiosError.isAxiosError && axiosError.response?.data?.message) {
    return axiosError.response.data.message
  }
  
  // Verificar si es un error de Axios sin response
  if (axiosError.isAxiosError && axiosError.message) {
    if (axiosError.message.includes('Network Error')) {
      return 'Error de conexión. Verifica tu internet.'
    }
    if (axiosError.message.includes('timeout')) {
      return 'La solicitud ha expirado. Intenta nuevamente.'
    }
    return axiosError.message
  }
  
  // Verificar si es un Error estándar
  if (error instanceof Error) {
    return error.message
  }
  
  // Verificar si es un string
  if (typeof error === 'string') {
    return error
  }
  
  // Verificar si es un objeto con propiedad message
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message
  }
  
  // Error desconocido
  return 'Ha ocurrido un error desconocido'
}

/**
 * Extrae errores de validación de un error
 * @param error Error de cualquier tipo
 * @returns Objeto con errores de validación por campo
 */
export function extractValidationErrors(error: unknown): Record<string, string[]> {
  const axiosError = error as AxiosError<ApiError>
  
  // Si es un error de Axios con errores de validación (422)
  if (axiosError.isAxiosError && axiosError.response?.status === 422) {
    return axiosError.response.data?.errors || {}
  }
  
  // Si es un objeto con propiedad errors
  if (error && typeof error === 'object' && 'errors' in error) {
    const errors = (error as any).errors
    if (typeof errors === 'object' && errors !== null) {
      return errors as Record<string, string[]>
    }
  }
  
  // Sin errores de validación
  return {}
}

/**
 * Verifica si el error es de tipo "no autorizado" (401)
 * @param error Error de cualquier tipo
 * @returns True si es error 401
 */
export function isUnauthorizedError(error: unknown): boolean {
  const axiosError = error as AxiosError
  return axiosError.isAxiosError && axiosError.response?.status === 401
}

/**
 * Verifica si el error es de tipo "prohibido" (403)
 * @param error Error de cualquier tipo
 * @returns True si es error 403
 */
export function isForbiddenError(error: unknown): boolean {
  const axiosError = error as AxiosError
  return axiosError.isAxiosError && axiosError.response?.status === 403
}

/**
 * Verifica si el error es de tipo "no encontrado" (404)
 * @param error Error de cualquier tipo
 * @returns True si es error 404
 */
export function isNotFoundError(error: unknown): boolean {
  const axiosError = error as AxiosError
  return axiosError.isAxiosError && axiosError.response?.status === 404
}

/**
 * Verifica si el error es de tipo "validación" (422)
 * @param error Error de cualquier tipo
 * @returns True si es error 422
 */
export function isValidationError(error: unknown): boolean {
  const axiosError = error as AxiosError
  return axiosError.isAxiosError && axiosError.response?.status === 422
}

/**
 * Verifica si el error es de tipo "servidor" (500+)
 * @param error Error de cualquier tipo
 * @returns True si es error del servidor
 */
export function isServerError(error: unknown): boolean {
  const axiosError = error as AxiosError
  return axiosError.isAxiosError && axiosError.response?.status !== undefined && axiosError.response.status >= 500
}

/**
 * Verifica si el error es de conexión (network error)
 * @param error Error de cualquier tipo
 * @returns True si es error de conexión
 */
export function isNetworkError(error: unknown): boolean {
  const axiosError = error as AxiosError
  return axiosError.isAxiosError && (
    axiosError.message?.includes('Network Error') ||
    !axiosError.response
  )
}

/**
 * Convierte un error en un objeto ApiError estándar
 * @param error Error de cualquier tipo
 * @returns Objeto ApiError
 */
export function toApiError(error: unknown): ApiError {
  const axiosError = error as AxiosError<ApiError>
  
  if (axiosError.isAxiosError && axiosError.response?.data) {
    return {
      message: axiosError.response.data.message || 'Error desconocido',
      errors: axiosError.response.data.errors,
      status: axiosError.response.status,
      timestamp: axiosError.response.data.timestamp || new Date().toISOString()
    }
  }
  
  if (axiosError.isAxiosError) {
    return {
      message: extractErrorMessage(error),
      status: axiosError.response?.status || 0,
      timestamp: new Date().toISOString()
    }
  }
  
  return {
    message: extractErrorMessage(error),
    status: 0,
    timestamp: new Date().toISOString()
  }
}

/**
 * Maneja errores de manera centralizada y lanza una excepción con formato estándar
 * @param error Error de cualquier tipo
 * @param context Contexto adicional para el error
 * @throws Error con formato estándar
 */
export function handleError(error: unknown, context?: string): never {
  const apiError = toApiError(error)
  const errorMessage = context ? `[${context}] ${apiError.message}` : apiError.message
  
  const enhancedError = new Error(errorMessage)
  ;(enhancedError as any).apiError = apiError
  ;(enhancedError as any).validationErrors = apiError.errors
  
  throw enhancedError
}

/**
 * Obtiene el primer error de validación de un campo específico
 * @param error Error de cualquier tipo
 * @param fieldName Nombre del campo
 * @returns Primer error del campo o undefined
 */
export function getFieldError(error: unknown, fieldName: string): string | undefined {
  const validationErrors = extractValidationErrors(error)
  const fieldErrors = validationErrors[fieldName]
  return fieldErrors?.[0]
}

/**
 * Verifica si un campo específico tiene errores de validación
 * @param error Error de cualquier tipo
 * @param fieldName Nombre del campo
 * @returns True si el campo tiene errores
 */
export function hasFieldError(error: unknown, fieldName: string): boolean {
  return !!getFieldError(error, fieldName)
}

/**
 * Formatea errores de validación para mostrar en UI
 * @param validationErrors Errores de validación
 * @returns Array de mensajes de error formateados
 */
export function formatValidationErrors(validationErrors: Record<string, string[]>): string[] {
  const messages: string[] = []
  
  Object.entries(validationErrors).forEach(([field, errors]) => {
    errors.forEach(error => {
      // Capitalizar primera letra y añadir nombre del campo
      const fieldName = field.replace(/([A-Z])/g, ' $1').toLowerCase()
      const capitalizedField = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
      messages.push(`${capitalizedField}: ${error}`)
    })
  })
  
  return messages
}