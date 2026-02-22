// User model
export interface User {
  id: number
  email: string
  nombre: string
  apellidos: string
  rol: UserRole
  telefono?: string
  direccion?: string
  fechaRegistro: Date
  fechaUltimoAcceso?: Date
  activo: boolean
  avatarUrl?: string
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  BIBLIOTECARIO = 'BIBLIOTECARIO'
}

// Book model
export interface Libro {
  id: number
  titulo: string
  autor: string
  isbn: string
  descripcion?: string
  editorial: string
  anioPublicacion: number
  categoria: Categoria
  subcategoria?: Subcategoria
  numeroPaginas?: number
  idioma: string
  copiasDisponibles: number
  copiasTotales: number
  imagenPortada?: string
  estado: EstadoLibro
  fechaCreacion: Date
  fechaActualizacion: Date
}

export interface Categoria {
  id: number
  nombre: string
  descripcion?: string
  icono?: string
  color?: string
}

export interface Subcategoria {
  id: number
  nombre: string
  categoriaId: number
  descripcion?: string
}

export enum EstadoLibro {
  DISPONIBLE = 'DISPONIBLE',
  PRESTADO = 'PRESTADO',
  RESERVADO = 'RESERVADO',
  MANTENIMIENTO = 'MANTENIMIENTO',
  PERDIDO = 'PERDIDO'
}

// Loan model
export interface Prestamo {
  id: number
  libro: Libro
  usuario: User
  fechaPrestamo: Date
  fechaDevolucionPrevista: Date
  fechaDevolucionReal?: Date
  estado: EstadoPrestamo
  renovaciones: number
  notas?: string
}

export enum EstadoPrestamo {
  ACTIVO = 'ACTIVO',
  DEVUELTO = 'DEVUELTO',
  VENCIDO = 'VENCIDO',
  CANCELADO = 'CANCELADO'
}

// Message model
export interface Mensaje {
  id: number
  contenido: string
  remitente: User
  destinatario?: User
  conversacionId: number
  leido: boolean
  fechaEnvio: Date
  fechaLeido?: Date
}

export interface Conversacion {
  id: number
  usuario1: User
  usuario2: User
  ultimoMensaje?: Mensaje
  noLeidos: number
  fechaCreacion: Date
  fechaActualizacion: Date
}

// Reservation model
export interface Reserva {
  id: number
  libro: Libro
  usuario: User
  fechaReserva: Date
  fechaExpiracion: Date
  estado: EstadoReserva
  prioridad: number
}

export enum EstadoReserva {
  ACTIVA = 'ACTIVA',
  COMPLETADA = 'COMPLETADA',
  CANCELADA = 'CANCELADA',
  EXPIRADA = 'EXPIRADA'
}

// Notification model
export interface Notificacion {
  id: number
  usuario: User
  tipo: TipoNotificacion
  titulo: string
  mensaje: string
  leido: boolean
  fechaCreacion: Date
  fechaLeido?: Date
  metadata?: Record<string, any>
}

export enum TipoNotificacion {
  PRESTAMO = 'PRESTAMO',
  DEVOLUCION = 'DEVOLUCION',
  RESERVA = 'RESERVA',
  SISTEMA = 'SISTEMA',
  MENSAJE = 'MENSAJE'
}

// Report model
export interface Reporte {
  id: number
  tipo: TipoReporte
  datos: any
  fechaGeneracion: Date
  usuarioGenerador?: User
}

export enum TipoReporte {
  PRESTAMOS = 'PRESTAMOS',
  LIBROS = 'LIBROS',
  USUARIOS = 'USUARIOS',
  FINANCIERO = 'FINANCIERO'
}