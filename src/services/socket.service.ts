import { io, type Socket } from 'socket.io-client'
import type { SocketEvents, SocketServiceOptions, SocketConnectionState, SocketError } from '@/types/socket.types'
import { useAuthStore } from '@/stores/auth.store'
import { useToast } from '@/composables/useToast'

export class SocketService {
  private socket: Socket | null = null
  private connectionState: SocketConnectionState = {
    connected: false,
    connecting: false,
    error: null,
    lastConnectionTime: null,
    reconnectionAttempts: 0
  }
  private subscriptions: Map<string, Set<(...args: any[]) => void>> = new Map()
  private toast = useToast()

  constructor(private options: SocketServiceOptions = {}) {
    this.options = {
      url: import.meta.env.VITE_WS_URL || 'http://localhost:3000',
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      ...options
    }
  }

  /**
   * Conectar al servidor de Socket.IO
   */
  connect(): void {
    if (this.socket?.connected || this.connectionState.connecting) {
      return
    }

    const authStore = useAuthStore()
    const token = authStore.token

    if (!token) {
      console.warn('No hay token disponible para la conexión socket')
      return
    }

    this.connectionState.connecting = true
    this.connectionState.error = null

    this.socket = io(this.options.url!, {
      auth: {
        token: token
      },
      autoConnect: this.options.autoConnect,
      reconnection: this.options.reconnection,
      reconnectionAttempts: this.options.reconnectionAttempts,
      reconnectionDelay: this.options.reconnectionDelay
    })

    this.setupEventListeners()
  }

  /**
   * Configurar listeners de eventos del socket
   */
  private setupEventListeners(): void {
    if (!this.socket) return

    this.socket.on('connect', () => {
      this.connectionState.connected = true
      this.connectionState.connecting = false
      this.connectionState.lastConnectionTime = new Date()
      this.connectionState.reconnectionAttempts = 0
      console.log('Socket conectado')
    })

    this.socket.on('disconnect', (reason) => {
      this.connectionState.connected = false
      this.connectionState.connecting = false
      console.log('Socket desconectado:', reason)
    })

    this.socket.on('connect_error', (error) => {
      this.connectionState.connected = false
      this.connectionState.connecting = false
      this.connectionState.error = error.message
      console.error('Error de conexión socket:', error.message)
    })

    this.socket.on('error', (error: SocketError) => {
      console.error('Error socket:', error)
      this.toast.error(`Error de conexión: ${error.message}`)
    })

    // Escuchar eventos personalizados que están suscritos
    this.socket.onAny((event, ...args) => {
      this.emitToSubscribers(event, ...args)
    })
  }

  /**
   * Desconectar el socket
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.connectionState.connected = false
      this.connectionState.connecting = false
      this.subscriptions.clear()
      console.log('Socket desconectado manualmente')
    }
  }

  /**
   * Emitir un evento al servidor
   */
  emit<T extends keyof SocketEvents>(
    event: T,
    ...args: Parameters<SocketEvents[T]>
  ): void {
    if (this.socket && this.connectionState.connected) {
      this.socket.emit(event, ...args)
    } else {
      console.warn(`Socket no conectado. No se pudo emitir evento: ${String(event)}`)
    }
  }

  /**
   * Suscribirse a un evento
   */
  on<T extends keyof SocketEvents>(
    event: T,
    callback: SocketEvents[T]
  ): () => void {
    if (!this.subscriptions.has(event)) {
      this.subscriptions.set(event, new Set())
    }
    this.subscriptions.get(event)!.add(callback)

    // Retornar función para desuscribirse
    return () => {
      this.off(event, callback)
    }
  }

  /**
   * Desuscribirse de un evento
   */
  off<T extends keyof SocketEvents>(
    event: T,
    callback?: SocketEvents[T]
  ): void {
    const callbacks = this.subscriptions.get(event)
    if (!callbacks) return

    if (callback) {
      callbacks.delete(callback)
      if (callbacks.size === 0) {
        this.subscriptions.delete(event)
      }
    } else {
      // Remover todos los callbacks del evento
      this.subscriptions.delete(event)
    }
  }

  /**
   * Emitir evento a los suscriptores locales
   */
  private emitToSubscribers(event: string, ...args: any[]): void {
    const callbacks = this.subscriptions.get(event)
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(...args)
        } catch (error) {
          console.error(`Error ejecutando callback para evento ${event}:`, error)
        }
      })
    }
  }

  /**
   * Unirse a una conversación
   */
  joinConversation(userId: number): void {
    this.emit('join_conversation', userId)
  }

  /**
   * Salir de una conversación
   */
  leaveConversation(userId: number): void {
    this.emit('leave_conversation', userId)
  }

  /**
   * Enviar mensaje
   */
  sendMessage(mensaje: any): void {
    this.emit('send_message', mensaje)
  }

  /**
   * Indicar que se está escribiendo
   */
  typing(userId: number, conversationId?: number): void {
    this.emit('typing', userId, conversationId)
  }

  /**
   * Indicar que se dejó de escribir
   */
  stopTyping(userId: number, conversationId?: number): void {
    this.emit('stop_typing', userId, conversationId)
  }

  /**
   * Marcar mensaje como leído
   */
  markAsRead(mensajeId: number): void {
    this.emit('mark_as_read', mensajeId)
  }

  /**
   * Marcar conversación como leída
   */
  markConversationAsRead(usuarioId: number): void {
    this.emit('mark_conversation_as_read', usuarioId)
  }

  /**
   * Obtener estado de conexión
   */
  getConnectionState(): SocketConnectionState {
    return { ...this.connectionState }
  }

  /**
   * Verificar si está conectado
   */
  isConnected(): boolean {
    return this.connectionState.connected
  }

  /**
   * Obtener instancia de socket (para uso avanzado)
   */
  getSocket(): Socket | null {
    return this.socket
  }

  /**
   * Reconectar manualmente
   */
  reconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
      this.socket.connect()
    } else {
      this.connect()
    }
  }
}

// Instancia singleton del servicio de socket
export const socketService = new SocketService()