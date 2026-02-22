export enum UserRole {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
  BIBLIOTECARIO = 'ROLE_BIBLIOTECARIO'
}

export enum PrestamoEstado {
  ACTIVO = 'ACTIVO',
  DEVUELTO = 'DEVUELTO',
  RETRASADO = 'RETRASADO',
  RENOVADO = 'RENOVADO'
}

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

// Enums adicionales que ya existían en models.types.ts
export enum EstadoLibro {
  DISPONIBLE = 'DISPONIBLE',
  PRESTADO = 'PRESTADO',
  RESERVADO = 'RESERVADO',
  MANTENIMIENTO = 'MANTENIMIENTO',
  PERDIDO = 'PERDIDO'
}

export enum EstadoPrestamo {
  ACTIVO = 'ACTIVO',
  DEVUELTO = 'DEVUELTO',
  VENCIDO = 'VENCIDO',
  CANCELADO = 'CANCELADO'
}

export enum EstadoReserva {
  ACTIVA = 'ACTIVA',
  COMPLETADA = 'COMPLETADA',
  CANCELADA = 'CANCELADA',
  EXPIRADA = 'EXPIRADA'
}

export enum TipoNotificacion {
  PRESTAMO = 'PRESTAMO',
  DEVOLUCION = 'DEVOLUCION',
  RESERVA = 'RESERVA',
  SISTEMA = 'SISTEMA',
  MENSAJE = 'MENSAJE'
}

export enum TipoReporte {
  PRESTAMOS = 'PRESTAMOS',
  LIBROS = 'LIBROS',
  USUARIOS = 'USUARIOS',
  FINANCIERO = 'FINANCIERO'
}