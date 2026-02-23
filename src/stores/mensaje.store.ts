import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Mensaje, Conversacion } from '@/types/models.types'
import type { CreateMensajeDTO } from '@/types/api.types'
import { mensajeService } from '@/services/mensaje.service'

export const useMensajeStore = defineStore('mensaje', () => {
  // State
  const conversaciones = ref<Conversacion[]>([])
  const mensajesActuales = ref<Mensaje[]>([])
  const conversacionActivaId = ref<number | null>(null)
  const noLeidosCount = ref(0)
  const loading = ref(false)

  // Getters
  const tieneNoLeidos = computed(() => noLeidosCount.value > 0)

  // Actions
  async function fetchConversaciones(): Promise<void> {
    loading.value = true
    try {
      conversaciones.value = await mensajeService.getConversaciones()
      await fetchNoLeidosCount()
    } finally {
      loading.value = false
    }
  }

  async function fetchMensajes(usuarioId: number): Promise<void> {
    loading.value = true
    conversacionActivaId.value = usuarioId
    try {
      mensajesActuales.value = await mensajeService.getMensajes(usuarioId)
    } finally {
      loading.value = false
    }
  }

  async function enviarMensaje(data: CreateMensajeDTO): Promise<void> {
    const nuevoMensaje = await mensajeService.enviarMensaje(data)
    mensajesActuales.value.push(nuevoMensaje)
  }

  async function fetchNoLeidosCount(): Promise<void> {
    noLeidosCount.value = await mensajeService.getNoLeidosCount()
  }

  function agregarMensajeEnTiempoReal(mensaje: Mensaje): void {
    // Llamado desde socket cuando llega mensaje nuevo
    if (mensaje.destinatario.id === conversacionActivaId.value || 
        mensaje.remitente.id === conversacionActivaId.value) {
      mensajesActuales.value.push(mensaje)
    }
    
    // Actualizar contador de no leídos
    if (!mensaje.leido) {
      noLeidosCount.value++
    }
    
    // Actualizar conversaciones
    fetchConversaciones()
  }

  return {
    conversaciones,
    mensajesActuales,
    conversacionActivaId,
    noLeidosCount,
    loading,
    tieneNoLeidos,
    fetchConversaciones,
    fetchMensajes,
    enviarMensaje,
    fetchNoLeidosCount,
    agregarMensajeEnTiempoReal
  }
})