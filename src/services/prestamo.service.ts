import { apiService } from './api.service'
import type { PaginatedResponse, PrestamoFilters, CreatePrestamoDTO } from '@/types/api.types'
import type { Prestamo } from '@/types/models.types'

export class PrestamoService {
  // Usuario
  /**
   * Obtener los préstamos del usuario actual
   * @param filters Filtros de búsqueda
   * @returns Respuesta paginada de préstamos
   */
  async getMisPrestamos(filters: PrestamoFilters = {}): Promise<PaginatedResponse<Prestamo>> {
    const params = new URLSearchParams()
    if (filters.page) params.append('page', filters.page.toString())
    if (filters.estado) params.append('estado', filters.estado)

    return apiService.get<PaginatedResponse<Prestamo>>(`/prestamos?${params.toString()}`)
  }

  /**
   * Obtener préstamos activos del usuario actual
   * @returns Lista de préstamos activos
   */
  async getPrestamosActivos(): Promise<Prestamo[]> {
    return apiService.get<Prestamo[]>('/prestamos/activos')
  }

  /**
   * Obtener un préstamo específico por ID
   * @param id ID del préstamo
   * @returns Préstamo encontrado
   */
  async getPrestamo(id: number): Promise<Prestamo> {
    return apiService.get<Prestamo>(`/prestamos/${id}`)
  }

  /**
   * Solicitar un nuevo préstamo
   * @param data Datos del préstamo
   * @returns Préstamo creado
   */
  async solicitarPrestamo(data: CreatePrestamoDTO): Promise<Prestamo> {
    return apiService.post<Prestamo>('/prestamos', data)
  }

  /**
   * Renovar un préstamo existente
   * @param id ID del préstamo
   * @returns Préstamo renovado
   */
  async renovarPrestamo(id: number): Promise<Prestamo> {
    return apiService.put<Prestamo>(`/prestamos/${id}/renovar`)
  }

  /**
   * Devolver un libro (para usuario)
   * @param id ID del préstamo
   * @returns Préstamo actualizado
   */
  async devolverLibro(id: number): Promise<Prestamo> {
    return apiService.put<Prestamo>(`/prestamos/${id}/devolver`)
  }

  // Admin
  /**
   * Obtener todos los préstamos (admin)
   * @param filters Filtros de búsqueda
   * @returns Respuesta paginada de todos los préstamos
   */
  async getAllPrestamos(filters: PrestamoFilters = {}): Promise<PaginatedResponse<Prestamo>> {
    const params = new URLSearchParams()
    if (filters.page) params.append('page', filters.page.toString())
    if (filters.estado) params.append('estado', filters.estado)
    if (filters.usuarioId) params.append('usuario', filters.usuarioId.toString())

    return apiService.get<PaginatedResponse<Prestamo>>(`/admin/prestamos?${params.toString()}`)
  }

  /**
   * Obtener préstamos retrasados (admin)
   * @returns Lista de préstamos retrasados
   */
  async getPrestamosRetrasados(): Promise<Prestamo[]> {
    return apiService.get<Prestamo[]>('/admin/prestamos/retrasados')
  }

  /**
   * Aprobar un préstamo pendiente (admin)
   * @param id ID del préstamo
   * @returns Préstamo aprobado
   */
  async aprobarPrestamo(id: number): Promise<Prestamo> {
    return apiService.put<Prestamo>(`/admin/prestamos/${id}/aprobar`)
  }

  /**
   * Rechazar un préstamo pendiente (admin)
   * @param id ID del préstamo
   * @param motivo Motivo del rechazo
   * @returns Préstamo rechazado
   */
  async rechazarPrestamo(id: number, motivo: string): Promise<Prestamo> {
    return apiService.put<Prestamo>(`/admin/prestamos/${id}/rechazar`, { motivo })
  }

  /**
   * Registrar sanción por retraso (admin)
   * @param id ID del préstamo
   * @param diasSancion Días de sanción
   * @returns Préstamo actualizado
   */
  async registrarSancion(id: number, diasSancion: number): Promise<Prestamo> {
    return apiService.put<Prestamo>(`/admin/prestamos/${id}/sancion`, { diasSancion })
  }

  /**
   * Eliminar sanción (admin)
   * @param id ID del préstamo
   * @returns Préstamo actualizado
   */
  async eliminarSancion(id: number): Promise<Prestamo> {
    return apiService.put<Prestamo>(`/admin/prestamos/${id}/eliminar-sancion`)
  }
}

export const prestamoService = new PrestamoService()