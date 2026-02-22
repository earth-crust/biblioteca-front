import { apiService } from './api.service'

interface DashboardMetrics {
  libros: {
    total: number
    disponibles: number
  }
  usuarios: {
    total: number
    activos: number
  }
  prestamos: {
    activos: number
    retrasados: number
  }
  graficos: {
    prestamosPorMes: Array<{ mes: string; cantidad: number }>
    librosPorCategoria: Array<{ categoria: string; cantidad: number }>
    usuariosPorMes: Array<{ mes: string; cantidad: number }>
  }
}

interface LibroPopular {
  libro: any
  totalPrestamos: number
}

interface ReporteData {
  id: number
  tipo: string
  fechaGeneracion: string
  urlDescarga?: string
}

export class AdminService {
  /**
   * Obtener métricas del dashboard de administración
   * @returns Métricas del dashboard
   */
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    return apiService.get<DashboardMetrics>('/admin/dashboard')
  }

  /**
   * Obtener libros más populares
   * @param periodo Periodo de tiempo (opcional)
   * @returns Lista de libros populares
   */
  async getLibrosPopulares(periodo?: string): Promise<LibroPopular[]> {
    const url = periodo 
      ? `/admin/reportes/libros-populares?periodo=${periodo}`
      : '/admin/reportes/libros-populares'
    return apiService.get<LibroPopular[]>(url)
  }

  /**
   * Obtener todos los usuarios (admin)
   * @param page Número de página
   * @param limit Límite por página
   * @param search Búsqueda por nombre o email
   * @returns Respuesta paginada de usuarios
   */
  async getUsuarios(page: number = 1, limit: number = 20, search?: string): Promise<any> {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())
    if (search) params.append('search', search)
    
    return apiService.get(`/admin/usuarios?${params.toString()}`)
  }

  /**
   * Bloquear un usuario
   * @param id ID del usuario
   * @returns Promesa vacía
   */
  async bloquearUsuario(id: number): Promise<void> {
    return apiService.put<void>(`/admin/usuarios/${id}/bloquear`)
  }

  /**
   * Desbloquear un usuario
   * @param id ID del usuario
   * @returns Promesa vacía
   */
  async desbloquearUsuario(id: number): Promise<void> {
    return apiService.put<void>(`/admin/usuarios/${id}/desbloquear`)
  }

  /**
   * Exportar reporte en formato CSV
   * @param tipo Tipo de reporte (libros, prestamos, usuarios)
   * @param filename Nombre del archivo a descargar
   * @returns Promesa vacía
   */
  async exportarReporte(tipo: string, filename: string): Promise<void> {
    return apiService.downloadFile(`/admin/export/${tipo}.csv`, filename)
  }

  /**
   * Generar nuevo reporte
   * @param tipo Tipo de reporte
   * @param parametros Parámetros del reporte
   * @returns Datos del reporte generado
   */
  async generarReporte(tipo: string, parametros?: Record<string, any>): Promise<ReporteData> {
    return apiService.post<ReporteData>(`/admin/reportes/${tipo}/generar`, parametros)
  }

  /**
   * Obtener reportes generados
   * @param page Número de página
   * @param limit Límite por página
   * @returns Lista de reportes
   */
  async getReportes(page: number = 1, limit: number = 10): Promise<any> {
    return apiService.get(`/admin/reportes?page=${page}&limit=${limit}`)
  }

  /**
   * Descargar reporte generado
   * @param id ID del reporte
   * @param filename Nombre del archivo
   * @returns Promesa vacía
   */
  async descargarReporte(id: number, filename: string): Promise<void> {
    return apiService.downloadFile(`/admin/reportes/${id}/descargar`, filename)
  }

  /**
   * Obtener estadísticas detalladas
   * @param periodo Periodo de tiempo
   * @returns Estadísticas detalladas
   */
  async getEstadisticasDetalladas(periodo?: string): Promise<any> {
    const url = periodo 
      ? `/admin/estadisticas?periodo=${periodo}`
      : '/admin/estadisticas'
    return apiService.get<any>(url)
  }

  /**
   * Obtener logs del sistema
   * @param page Número de página
   * @param limit Límite por página
   * @param nivel Nivel de log (opcional)
   * @returns Lista de logs
   */
  async getLogs(page: number = 1, limit: number = 50, nivel?: string): Promise<any> {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())
    if (nivel) params.append('nivel', nivel)
    
    return apiService.get<any>(`/admin/logs?${params.toString()}`)
  }
}

export const adminService = new AdminService()