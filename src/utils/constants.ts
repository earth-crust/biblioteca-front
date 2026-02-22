// App constants
export const APP_NAME = 'Sistema de Gestión de Biblioteca'
export const APP_VERSION = '1.0.0'

// LocalStorage keys
export const TOKEN_KEY = 'auth_token'
export const REFRESH_TOKEN_KEY = 'auth_refresh_token'
export const USER_KEY = 'user_data'
export const THEME_KEY = 'app_theme'
export const LANGUAGE_KEY = 'app_language'

// API constants
export const API_TIMEOUT = 30000
export const MAX_RETRIES = 3
export const RETRY_DELAY = 1000

// Pagination constants
export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]
export const MAX_PAGE_SIZE = 100

// Date formats
export const DATE_FORMAT = 'DD/MM/YYYY'
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm'
export const TIME_FORMAT = 'HH:mm'

// Validation constants
export const MIN_PASSWORD_LENGTH = 6
export const MAX_PASSWORD_LENGTH = 128
export const MIN_NAME_LENGTH = 2
export const MAX_NAME_LENGTH = 100
export const MIN_EMAIL_LENGTH = 3
export const MAX_EMAIL_LENGTH = 254

// Roles
export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  BIBLIOTECARIO: 'BIBLIOTECARIO'
} as const

// Book status
export const BOOK_STATUS = {
  DISPONIBLE: 'DISPONIBLE',
  PRESTADO: 'PRESTADO',
  RESERVADO: 'RESERVADO',
  MANTENIMIENTO: 'MANTENIMIENTO',
  PERDIDO: 'PERDIDO'
} as const

// Loan status
export const LOAN_STATUS = {
  ACTIVO: 'ACTIVO',
  DEVUELTO: 'DEVUELTO',
  VENCIDO: 'VENCIDO',
  CANCELADO: 'CANCELADO'
} as const

// Notification types
export const NOTIFICATION_TYPES = {
  PRESTAMO: 'PRESTAMO',
  DEVOLUCION: 'DEVOLUCION',
  RESERVA: 'RESERVA',
  SISTEMA: 'SISTEMA',
  MENSAJE: 'MENSAJE'
} as const

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CATALOGO: '/catalogo',
  PRESTAMOS: '/prestamos',
  MENSAJES: '/mensajes',
  PERFIL: '/perfil',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_LIBROS: '/admin/libros',
  ADMIN_USUARIOS: '/admin/usuarios',
  ADMIN_PRESTAMOS: '/admin/prestamos'
} as const

// UI constants
export const TOAST_DURATION = 3000
export const TOAST_POSITION = 'top-right'
export const MODAL_ANIMATION_DURATION = 300
export const DEBOUNCE_DELAY = 300

// Cache constants
export const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
export const CACHE_PREFIX = 'biblioteca_'

// Socket events
export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ERROR: 'error',
  NUEVO_MENSAJE: 'nuevo_mensaje',
  MENSAJE_LEIDO: 'mensaje_leido',
  NOTIFICACION: 'notificacion',
  PRESTAMO_ACTUALIZADO: 'prestamo_actualizado'
} as const

// Environment
export const IS_DEVELOPMENT = import.meta.env.DEV
export const IS_PRODUCTION = import.meta.env.PROD
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
export const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:3000'