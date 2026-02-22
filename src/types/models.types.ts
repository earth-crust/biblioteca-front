// Import enums from enums.ts
import type { UserRole, PrestamoEstado, EstadoReserva, TipoNotificacion, TipoReporte } from './enums'

// Usuario
export interface User {
  id: number
  email: string
  nombre: string
  apellidos: string
  telefono?: string
  roles: UserRole[]
  activo: boolean
  fechaRegistro: string
}

// Categoría
export interface Categoria {
  id: number
  nombre: string
  descripcion?: string
  libroCount?: number
}

// Autor
export interface Autor {
  id: number
  nombre: string
  apellidos: string
  biografia?: string
  fechaNacimiento?: string
  nombreCompleto?: string // computed
}

// Libro
export interface Libro {
  id: number
  isbn?: string
  titulo: string
  descripcion: string
  numeroCopias: number
  copiasDisponibles: number
  añoPublicacion: number
  imagen?: string
  editorial: string
  fechaCreacion: string
  categoria: Categoria
  autor: Autor
  disponible?: boolean // computed
}

// Préstamo
export interface Prestamo {
  id: number
  usuario: User
  libro: Libro
  fechaPrestamo: string
  fechaDevolucionEsperada: string
  fechaDevolucionReal?: string
  estadoPrestamo: PrestamoEstado
  renovaciones: number
  sancion: boolean
  diasRetraso?: number
  diasRestantes?: number // computed
  puedeRenovar?: boolean // computed
}

// Mensaje
export interface Mensaje {
  id: number
  remitente: User
  destinatario: User
  contenido: string
  leido: boolean
  fechaEnvio: string
  prestamo?: Prestamo
}

// Conversación (agrupación de mensajes)
export interface Conversacion {
  usuario: User
  ultimoMensaje: Mensaje
  noLeidos: number
}

// Modelos existentes que se mantienen para compatibilidad

export interface Subcategoria {
  id: number
  nombre: string
  categoriaId: number
  descripcion?: string
}

// Reservation model (mantenido para compatibilidad)
export interface Reserva {
  id: number
  libro: Libro
  usuario: User
  fechaReserva: string
  fechaExpiracion: string
  estado: EstadoReserva
  prioridad: number
}

// Notification model (mantenido para compatibilidad)
export interface Notificacion {
  id: number
  usuario: User
  tipo: TipoNotificacion
  titulo: string
  mensaje: string
  leido: boolean
  fechaCreacion: string
  fechaLeido?: string
  metadata?: Record<string, any>
}

// Report model (mantenido para compatibilidad)
export interface Reporte {
  id: number
  tipo: TipoReporte
  datos: any
  fechaGeneracion: string
  usuarioGenerador?: User
}
