import { apiService } from './api.service'
import type { CreateMensajeDTO } from '@/types/api.types'
import type { Mensaje, Conversacion } from '@/types/models.types'

export class MensajeService {
  /**
   * Obtener mensajes de una conversación específica
   * @param conversacionConId ID del usuario con quien se tiene la conversación
   * @returns Lista de mensajes
   */
  async getMensajes(conversacionConId: number): Promise<Mensaje[]> {
    return apiService.get<Mensaje[]>(`/mensajes?conversacionCon=${conversacionConId}`)
  }

  /**
   * Obtener todas las conversaciones del usuario
   * @returns Lista de conversaciones
   */
  async getConversaciones(): Promise<Conversacion[]> {
    return apiService.get<Conversacion[]>('/mensajes/conversaciones')
  }

  /**
   * Enviar un nuevo mensaje
   * @param data Datos del mensaje
   * @returns Mensaje enviado
   */
  async enviarMensaje(data: CreateMensajeDTO): Promise<Mensaje> {
    return apiService.post<Mensaje>('/mensajes', data)
  }

  /**
   * Marcar un mensaje como leído
   * @param id ID del mensaje
   * @returns Promesa vacía
   */
  async marcarComoLeido(id: number): Promise<void> {
    return apiService.put<void>(`/mensajes/${id}/leer`)
  }

  /**
   * Marcar todos los mensajes de una conversación como leídos
   * @param conversacionConId ID del usuario de la conversación
   * @returns Promesa vacía
   */
  async marcarTodosComoLeidos(conversacionConId: number): Promise<void> {
    return apiService.put<void>(`/mensajes/conversacion/${conversacionConId}/leer-todos`)
  }

  /**
   * Obtener cantidad de mensajes no leídos
   * @returns Número de mensajes no leídos
   */
  async getNoLeidosCount(): Promise<number> {
    const response = await apiService.get<{ count: number }>('/mensajes/no-leidos/count')
    return response.count
  }

  /**
   * Obtener mensajes no leídos
   * @returns Lista de mensajes no leídos
   */
  async getNoLeidos(): Promise<Mensaje[]> {
    return apiService.get<Mensaje[]>('/mensajes/no-leidos')
  }

  /**
   * Eliminar un mensaje (solo para el remitente)
   * @param id ID del mensaje
   * @returns Promesa vacía
   */
  async eliminarMensaje(id: number): Promise<void> {
    return apiService.delete<void>(`/mensajes/${id}`)
  }

  /**
   * Buscar mensajes por texto
   * @param query Texto de búsqueda
   * @returns Lista de mensajes encontrados
   */
  async buscarMensajes(query: string): Promise<Mensaje[]> {
    return apiService.get<Mensaje[]>(`/mensajes/buscar?q=${encodeURIComponent(query)}`)
  }

  /**
   * Obtener mensajes recientes
   * @param limit Límite de resultados
   * @returns Lista de mensajes recientes
   */
  async getMensajesRecientes(limit: number = 20): Promise<Mensaje[]> {
    return apiService.get<Mensaje[]>(`/mensajes/recientes?limit=${limit}`)
  }
}

export const mensajeService = new MensajeService()