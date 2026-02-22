import type { User, Libro, Prestamo, Mensaje, Conversacion, Categoria, Autor } from './models.types'
import type { BreadcrumbItem } from './ui.types'
import type { UserRole, PrestamoEstado } from './enums'

// Estados de los stores
export interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export interface LibroState {
  libros: Libro[]
  libroActual: Libro | null
  categorias: Categoria[]
  autores: Autor[]
  loading: boolean
  error: string | null
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface PrestamoState {
  prestamos: Prestamo[]
  prestamosActivos: Prestamo[]
  prestamoActual: Prestamo | null
  loading: boolean
  error: string | null
  pagination: {
    total: number
    page: number
    limit: number
  }
}

export interface MensajeState {
  conversaciones: Conversacion[]
  mensajesActuales: Mensaje[]
  noLeidosCount: number
  loading: boolean
  error: string | null
  conversacionActual: Conversacion | null
}

export interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  breadcrumbs: BreadcrumbItem[]
  loading: boolean
  modalOpen: boolean
  modalComponent?: string
  modalProps?: Record<string, any>
}

// Tipos para acciones de stores
export interface AuthActions {
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  refreshAuthToken: () => Promise<void>
  logout: () => Promise<void>
  fetchProfile: () => Promise<void>
  updateProfile: (userData: Partial<User>) => Promise<void>
  initialize: () => void
}

export interface LibroActions {
  fetchLibros: (filters?: any) => Promise<void>
  fetchLibro: (id: number) => Promise<void>
  createLibro: (libroData: any) => Promise<void>
  updateLibro: (id: number, libroData: any) => Promise<void>
  deleteLibro: (id: number) => Promise<void>
  fetchCategorias: () => Promise<void>
  fetchAutores: () => Promise<void>
}

export interface PrestamoActions {
  fetchPrestamos: (filters?: any) => Promise<void>
  fetchPrestamosActivos: () => Promise<void>
  fetchPrestamo: (id: number) => Promise<void>
  crearPrestamo: (libroId: number) => Promise<void>
  renovarPrestamo: (id: number, motivo?: string) => Promise<void>
  devolverPrestamo: (id: number) => Promise<void>
  cancelarPrestamo: (id: number) => Promise<void>
}

export interface MensajeActions {
  fetchConversaciones: () => Promise<void>
  fetchMensajes: (usuarioId: number) => Promise<void>
  enviarMensaje: (destinatarioId: number, contenido: string, prestamoId?: number) => Promise<void>
  marcarComoLeido: (mensajeId: number) => Promise<void>
  marcarConversacionComoLeida: (usuarioId: number) => Promise<void>
  eliminarMensaje: (mensajeId: number) => Promise<void>
}

export interface UIActions {
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark') => void
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void
  setLoading: (loading: boolean) => void
  openModal: (component: string, props?: Record<string, any>) => void
  closeModal: () => void
}

// Tipos para getters de stores
export interface AuthGetters {
  isAuthenticated: () => boolean
  userFullName: () => string
  userRole: () => UserRole | null
}

export interface LibroGetters {
  librosDisponibles: () => Libro[]
  librosPorCategoria: (categoriaId: number) => Libro[]
  libroPorId: (id: number) => Libro | null
}

export interface PrestamoGetters {
  prestamosActivos: () => Prestamo[]
  prestamosRetrasados: () => Prestamo[]
  prestamosPorEstado: (estado: PrestamoEstado) => Prestamo[]
}

export interface MensajeGetters {
  conversacionPorUsuarioId: (usuarioId: number) => Conversacion | null
  mensajesNoLeidosPorUsuarioId: (usuarioId: number) => number
  ultimaConversacion: () => Conversacion | null
}

// Store completo types
export interface Store {
  auth: AuthState & AuthActions & AuthGetters
  libro: LibroState & LibroActions & LibroGetters
  prestamo: PrestamoState & PrestamoActions & PrestamoGetters
  mensaje: MensajeState & MensajeActions & MensajeGetters
  ui: UIState & UIActions
}