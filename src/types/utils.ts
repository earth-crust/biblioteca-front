import type { User, Libro, Prestamo, Mensaje } from './models.types'
import { UserRole, PrestamoEstado, EstadoLibro } from './enums'

// Type guards
export function isUser(obj: any): obj is User {
  return obj && 
    typeof obj.id === 'number' &&
    typeof obj.email === 'string' &&
    typeof obj.nombre === 'string' &&
    typeof obj.apellidos === 'string' &&
    Array.isArray(obj.roles)
}

export function isLibro(obj: any): obj is Libro {
  return obj &&
    typeof obj.id === 'number' &&
    typeof obj.titulo === 'string' &&
    typeof obj.descripcion === 'string' &&
    typeof obj.numeroCopias === 'number' &&
    typeof obj.copiasDisponibles === 'number' &&
    obj.categoria &&
    obj.autor
}

export function isPrestamo(obj: any): obj is Prestamo {
  return obj &&
    typeof obj.id === 'number' &&
    obj.libro &&
    obj.usuario &&
    typeof obj.estadoPrestamo === 'string' &&
    typeof obj.fechaPrestamo === 'string' &&
    typeof obj.fechaDevolucionEsperada === 'string'
}

export function isMensaje(obj: any): obj is Mensaje {
  return obj &&
    typeof obj.id === 'number' &&
    typeof obj.contenido === 'string' &&
    typeof obj.leido === 'boolean' &&
    typeof obj.fechaEnvio === 'string' &&
    obj.remitente &&
    obj.destinatario
}

export function isUserRole(value: any): value is UserRole {
  return Object.values(UserRole).includes(value)
}

export function isPrestamoEstado(value: any): value is PrestamoEstado {
  return Object.values(PrestamoEstado).includes(value)
}

export function isEstadoLibro(value: any): value is EstadoLibro {
  return Object.values(EstadoLibro).includes(value)
}

// Mappers para transformar datos de API
export function mapLibroFromApi(data: any): Libro {
  return {
    ...data,
    disponible: data.copiasDisponibles > 0,
    añoPublicacion: data.anioPublicacion || data.añoPublicacion
  }
}

export function mapPrestamoFromApi(data: any): Prestamo {
  const now = new Date()
  const fechaEsperada = new Date(data.fechaDevolucionEsperada)
  const diasRestantes = Math.ceil((fechaEsperada.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  const diasRetraso = diasRestantes < 0 ? Math.abs(diasRestantes) : undefined
  
  return {
    ...data,
    diasRestantes: diasRestantes >= 0 ? diasRestantes : 0,
    diasRetraso,
    puedeRenovar: data.renovaciones < 2 && diasRestantes >= 0 && !data.sancion
  }
}

export function mapUserFromApi(data: any): User {
  return {
    ...data,
    roles: Array.isArray(data.roles) ? data.roles : [data.rol].filter(Boolean),
    fechaRegistro: data.fechaRegistro || data.createdAt
  }
}

export function mapMensajeFromApi(data: any): Mensaje {
  return {
    ...data,
    fechaEnvio: data.fechaEnvio || data.createdAt
  }
}

// Helper functions
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getDaysBetween(startDate: string | Date, endDate: string | Date): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = end.getTime() - start.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function isDateInPast(date: string | Date): boolean {
  const d = new Date(date)
  const now = new Date()
  return d.getTime() < now.getTime()
}

export function isDateInFuture(date: string | Date): boolean {
  const d = new Date(date)
  const now = new Date()
  return d.getTime() > now.getTime()
}

// URL helpers
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(`${key}[]`, v))
      } else {
        searchParams.append(key, value.toString())
      }
    }
  })
  
  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

// String helpers
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + '...'
}

export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export function formatPhoneNumber(phone: string): string {
  // Formato español: 123 456 789
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 9) {
    return `${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`
  }
  return phone
}

// Array helpers
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const keyValue = String(item[key])
    if (!groups[keyValue]) {
      groups[keyValue] = []
    }
    groups[keyValue].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aValue = a[key]
    const bValue = b[key]
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1
    if (aValue > bValue) return direction === 'asc' ? 1 : -1
    return 0
  })
}

export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set()
  return array.filter(item => {
    const keyValue = item[key]
    if (seen.has(keyValue)) {
      return false
    }
    seen.add(keyValue)
    return true
  })
}

// Object helpers
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => {
    delete result[key]
  })
  return result
}

// Validation helpers
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function isValidISBN(isbn: string): boolean {
  // Validación básica de ISBN (acepta ISBN-10 e ISBN-13)
  const isbnRegex = /^(?:\d{9}[\dXx]|\d{13})$/
  return isbnRegex.test(isbn.replace(/[-\s]/g, ''))
}

// Number helpers
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-ES').format(num)
}

export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency
  }).format(amount)
}

export function roundToTwoDecimals(num: number): number {
  return Math.round(num * 100) / 100
}