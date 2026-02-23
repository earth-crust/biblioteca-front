import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Prestamo } from '@/types/models.types'
import type { PrestamoFilters, CreatePrestamoDTO, PaginatedResponse } from '@/types/api.types'
import { PrestamoEstado } from '@/types/enums'
import { prestamoService } from '@/services/prestamo.service'

export const usePrestamoStore = defineStore('prestamo', () => {
  // State
  const prestamos = ref<Prestamo[]>([])
  const prestamosActivos = ref<Prestamo[]>([])
  const prestamoActual = ref<Prestamo | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const tienePrestamosActivos = computed(() => prestamosActivos.value.length > 0)
  
  const prestamosRetrasados = computed(() => 
    prestamosActivos.value.filter(p => p.diasRestantes && p.diasRestantes < 0)
  )
  
  const prestamosProximosAVencer = computed(() =>
    prestamosActivos.value.filter(p => 
      p.diasRestantes && p.diasRestantes > 0 && p.diasRestantes <= 3
    )
  )

  const countPrestamosActivos = computed(() => prestamosActivos.value.length)

  // Actions
  async function fetchMisPrestamos(filters: PrestamoFilters = {}): Promise<void> {
    loading.value = true
    error.value = null
    
    try {
      const response = await prestamoService.getMisPrestamos(filters)
      prestamos.value = response.data
    } catch (err) {
      error.value = 'Error al cargar préstamos'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchPrestamosActivos(): Promise<void> {
    loading.value = true
    try {
      prestamosActivos.value = await prestamoService.getPrestamosActivos()
    } catch (err) {
      error.value = 'Error al cargar préstamos activos'
    } finally {
      loading.value = false
    }
  }

  async function solicitarPrestamo(libroId: number): Promise<Prestamo> {
    loading.value = true
    error.value = null
    
    try {
      const nuevoPrestamo = await prestamoService.solicitarPrestamo({ libroId })
      prestamosActivos.value.unshift(nuevoPrestamo)
      prestamos.value.unshift(nuevoPrestamo)
      return nuevoPrestamo
    } catch (err: unknown) {
      error.value = 'Error al solicitar préstamo'
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as any
        if (axiosError.response?.data?.message) {
          error.value = axiosError.response.data.message
        }
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  async function renovarPrestamo(id: number): Promise<void> {
    loading.value = true
    try {
      const renovado = await prestamoService.renovarPrestamo(id)
      
      // Actualizar en ambas listas
      const updatePrestamo = (lista: Prestamo[]) => {
        const index = lista.findIndex(p => p.id === id)
        if (index !== -1) lista[index] = renovado
      }
      
      updatePrestamo(prestamos.value)
      updatePrestamo(prestamosActivos.value)
    } catch (err) {
      error.value = 'No se pudo renovar el préstamo'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function devolverLibro(id: number): Promise<void> {
    loading.value = true
    try {
      await prestamoService.devolverLibro(id)
      
      // Remover de préstamos activos
      prestamosActivos.value = prestamosActivos.value.filter(p => p.id !== id)
      
      // Actualizar en lista general
      const index = prestamos.value.findIndex(p => p.id === id)
      if (index !== -1) {
        const prestamo = prestamos.value[index]
        if (prestamo) {
          prestamo.estadoPrestamo = PrestamoEstado.DEVUELTO
        }
      }
    } catch (err) {
      error.value = 'Error al devolver libro'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Admin
  async function fetchAllPrestamos(filters: PrestamoFilters = {}): Promise<void> {
    loading.value = true
    try {
      const response = await prestamoService.getAllPrestamos(filters)
      prestamos.value = response.data
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    prestamos,
    prestamosActivos,
    prestamoActual,
    loading,
    error,
    // Getters
    tienePrestamosActivos,
    prestamosRetrasados,
    prestamosProximosAVencer,
    countPrestamosActivos,
    // Actions
    fetchMisPrestamos,
    fetchPrestamosActivos,
    solicitarPrestamo,
    renovarPrestamo,
    devolverLibro,
    fetchAllPrestamos
  }
})