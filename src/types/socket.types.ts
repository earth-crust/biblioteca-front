import type { Mensaje, Prestamo } from './models.types'
import type { CreateMensajeDTO } from './api.types'

// Eventos de Socket.IO
export interface SocketEvents {
  // Cliente emite
  'join_conversation': (userId: number) => void
  'leave_conversation': (userId: number) => void
  'send_message': (mensaje: CreateMensajeDTO) => void
  'typing': (userId: number, conversationId?: number) => void
  'stop_typing': (userId: number, conversationId?: number) => void
  'mark_as_read': (mensajeId: number) => void
  'mark_conversation_as_read': (usuarioId: number) => void
  
  // Cliente escucha
  'nuevo_mensaje': (mensaje: Mensaje) => void
  'mensaje_leido': (data: { mensajeId: number, leidoPor: number }) => void
  'user_typing': (data: { userId: number, conversationId?: number }) => void
  'user_stop_typing': (data: { userId: number, conversationId?: number }) => void
  'user_connected': (userId: number) => void
  'user_disconnected': (userId: number) => void
  'notificacion': (data: { tipo: string, mensaje: string, metadata?: any }) => void
  'prestamo_actualizado': (prestamo: Prestamo) => void
  'libro_actualizado': (libro: any) => void
}

// Tipos para el servicio de socket
export interface SocketServiceOptions {
  url?: string
  autoConnect?: boolean
  reconnection?: boolean
  reconnectionAttempts?: number
  reconnectionDelay?: number
  auth?: (cb: (data: Record<string, any>) => void) => void
}

export interface SocketConnectionState {
  connected: boolean
  connecting: boolean
  error: string | null
  lastConnectionTime: Date | null
  reconnectionAttempts: number
}

export interface SocketMessage<T = any> {
  event: string
  data: T
  timestamp: number
  sender?: string
  id?: string
}

export interface SocketError {
  message: string
  code: number
  data?: any
  timestamp: number
}

// Tipos para manejo de eventos específicos
export interface NuevoMensajePayload {
  mensaje: Mensaje
  conversationId?: number
  notify?: boolean
}

export interface NotificacionPayload {
  tipo: 'PRESTAMO' | 'DEVOLUCION' | 'RESERVA' | 'SISTEMA' | 'MENSAJE'
  titulo: string
  mensaje: string
  metadata?: {
    prestamoId?: number
    libroId?: number
    usuarioId?: number
    [key: string]: any
  }
  persist?: boolean
}

export interface UserPresencePayload {
  userId: number
  online: boolean
  lastSeen?: Date
  device?: string
}

// Helper types para typing de eventos
export type SocketEventKey = keyof SocketEvents

export type SocketEventCallback<T extends SocketEventKey> = SocketEvents[T]

export interface SocketEventSubscription {
  event: string
  callback: (...args: any[]) => void
  id: string
}