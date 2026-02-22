import { apiService } from './api.service'
import type { 
  PaginatedResponse, 
  LibroFilters, 
  CreateLibroDTO, 
  UpdateLibroDTO
} from '@/types/api.types'
import type { Libro, Categoria, Autor } from '@/types/models.types'

export class LibroService {
  /**
   * Obtener libros con filtros y paginación
   * @param filters Filtros de búsqueda
   * @returns Respuesta paginada de libros
   */
  async getLibros(filters: LibroFilters = {}): Promise<PaginatedResponse<Libro>> {
    const params = new URLSearchParams()
    if (filters.page) params.append('page', filters.page.toString())
    if (filters.limit) params.append('limit', filters.limit.toString())
    if (filters.search) params.append('search', filters.search)
    if (filters.categoriaId) params.append('categoria', filters.categoriaId.toString())
    if (filters.autorId) params.append('autor', filters.autorId.toString())
    if (filters.disponible !== undefined) params.append('disponible', filters.disponible.toString())

    return apiService.get<PaginatedResponse<Libro>>(`/libros?${params.toString()}`)
  }

  /**
   * Obtener un libro por ID
   * @param id ID del libro
   * @returns Libro encontrado
   */
  async getLibro(id: number): Promise<Libro> {
    return apiService.get<Libro>(`/libros/${id}`)
  }

  /**
   * Crear un nuevo libro (admin)
   * @param data Datos del libro
   * @returns Libro creado
   */
  async createLibro(data: CreateLibroDTO): Promise<Libro> {
    return apiService.post<Libro>('/libros', data)
  }

  /**
   * Actualizar un libro existente (admin)
   * @param id ID del libro
   * @param data Datos a actualizar
   * @returns Libro actualizado
   */
  async updateLibro(id: number, data: UpdateLibroDTO): Promise<Libro> {
    return apiService.put<Libro>(`/libros/${id}`, data)
  }

  /**
   * Eliminar un libro (admin)
   * @param id ID del libro
   * @returns Promesa vacía
   */
  async deleteLibro(id: number): Promise<void> {
    return apiService.delete<void>(`/libros/${id}`)
  }

  /**
   * Buscar libros por texto
   * @param query Texto de búsqueda
   * @returns Lista de libros encontrados
   */
  async searchLibros(query: string): Promise<Libro[]> {
    return apiService.get<Libro[]>(`/libros/search?q=${encodeURIComponent(query)}`)
  }

  /**
   * Obtener todas las categorías
   * @returns Lista de categorías
   */
  async getCategorias(): Promise<Categoria[]> {
    return apiService.get<Categoria[]>('/categorias')
  }

  /**
   * Crear una nueva categoría (admin)
   * @param data Datos de la categoría
   * @returns Categoría creada
   */
  async createCategoria(data: Omit<Categoria, 'id'>): Promise<Categoria> {
    return apiService.post<Categoria>('/categorias', data)
  }

  /**
   * Obtener todos los autores
   * @returns Lista de autores
   */
  async getAutores(): Promise<Autor[]> {
    return apiService.get<Autor[]>('/autores')
  }

  /**
   * Crear un nuevo autor (admin)
   * @param data Datos del autor
   * @returns Autor creado
   */
  async createAutor(data: Omit<Autor, 'id'>): Promise<Autor> {
    return apiService.post<Autor>('/autores', data)
  }

  /**
   * Actualizar un autor existente (admin)
   * @param id ID del autor
   * @param data Datos a actualizar
   * @returns Autor actualizado
   */
  async updateAutor(id: number, data: Partial<Autor>): Promise<Autor> {
    return apiService.put<Autor>(`/autores/${id}`, data)
  }

  /**
   * Obtener libros populares
   * @param limit Límite de resultados
   * @returns Lista de libros populares
   */
  async getLibrosPopulares(limit: number = 10): Promise<Libro[]> {
    return apiService.get<Libro[]>(`/libros/populares?limit=${limit}`)
  }

  /**
   * Obtener libros recientemente agregados
   * @param limit Límite de resultados
   * @returns Lista de libros recientes
   */
  async getLibrosRecientes(limit: number = 10): Promise<Libro[]> {
    return apiService.get<Libro[]>(`/libros/recientes?limit=${limit}`)
  }
}

export const libroService = new LibroService()