import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Libro, Categoria, Autor } from '@/types/models.types'
import type { LibroFilters, CreateLibroDTO, UpdateLibroDTO, PaginatedResponse } from '@/types/api.types'
import { libroService } from '@/services/libro.service'

export const useLibroStore = defineStore('libro', () => {
  // State
  const libros = ref<Libro[]>([])
  const libroActual = ref<Libro | null>(null)
  const categorias = ref<Categoria[]>([])
  const autores = ref<Autor[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0
  })

  // Getters
  const librosDisponibles = computed(() => 
    libros.value.filter(libro => libro.copiasDisponibles > 0)
  )

  const librosPorCategoria = computed(() => {
    const grouped: Record<string, Libro[]> = {}
    libros.value.forEach(libro => {
      const catName = libro.categoria.nombre
      if (!grouped[catName]) grouped[catName] = []
      grouped[catName].push(libro)
    })
    return grouped
  })

  // Actions
  async function fetchLibros(filters: LibroFilters = {}): Promise<void> {
    loading.value = true
    error.value = null
    
    try {
      const response = await libroService.getLibros({
        ...filters,
        page: pagination.value.page,
        limit: pagination.value.limit
      })
      
      libros.value = response.data
      pagination.value = {
        ...pagination.value,
        total: response.meta.total,
        totalPages: response.meta.totalPages
      }
    } catch (err) {
      error.value = 'Error al cargar libros'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchLibro(id: number): Promise<void> {
    loading.value = true
    try {
      libroActual.value = await libroService.getLibro(id)
    } catch (err) {
      error.value = 'Libro no encontrado'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createLibro(data: CreateLibroDTO): Promise<Libro> {
    loading.value = true
    try {
      const nuevoLibro = await libroService.createLibro(data)
      libros.value.unshift(nuevoLibro)
      return nuevoLibro
    } finally {
      loading.value = false
    }
  }

  async function updateLibro(id: number, data: UpdateLibroDTO): Promise<void> {
    loading.value = true
    try {
      const updatedLibro = await libroService.updateLibro(id, data)
      const index = libros.value.findIndex(l => l.id === id)
      if (index !== -1) {
        libros.value[index] = updatedLibro
      }
      if (libroActual.value?.id === id) {
        libroActual.value = updatedLibro
      }
    } finally {
      loading.value = false
    }
  }

  async function deleteLibro(id: number): Promise<void> {
    loading.value = true
    try {
      await libroService.deleteLibro(id)
      libros.value = libros.value.filter(l => l.id !== id)
    } finally {
      loading.value = false
    }
  }

  async function searchLibros(query: string): Promise<void> {
    loading.value = true
    try {
      libros.value = await libroService.searchLibros(query)
    } finally {
      loading.value = false
    }
  }

  async function fetchCategorias(): Promise<void> {
    try {
      categorias.value = await libroService.getCategorias()
    } catch (err) {
      console.error('Error al cargar categorías:', err)
    }
  }

  async function fetchAutores(): Promise<void> {
    try {
      autores.value = await libroService.getAutores()
    } catch (err) {
      console.error('Error al cargar autores:', err)
    }
  }

  function setPage(page: number): void {
    pagination.value.page = page
  }

  function resetPagination(): void {
    pagination.value = {
      total: 0,
      page: 1,
      limit: 12,
      totalPages: 0
    }
  }

  return {
    // State
    libros,
    libroActual,
    categorias,
    autores,
    loading,
    error,
    pagination,
    // Getters
    librosDisponibles,
    librosPorCategoria,
    // Actions
    fetchLibros,
    fetchLibro,
    createLibro,
    updateLibro,
    deleteLibro,
    searchLibros,
    fetchCategorias,
    fetchAutores,
    setPage,
    resetPagination
  }
})