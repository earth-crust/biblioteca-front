// Para formularios con VeeValidate
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
  nombre: string
  apellidos: string
  telefono?: string
}

export interface LibroForm {
  isbn?: string
  titulo: string
  descripcion: string
  numeroCopias: number
  añoPublicacion: number
  imagen?: string
  editorial: string
  categoriaId: number | null
  autorId: number | null
}

export interface MensajeForm {
  destinatarioId: number
  contenido: string
}

export interface ProfileForm {
  nombre: string
  apellidos: string
  telefono?: string
}

export interface PasswordChangeForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface PrestamoRenovacionForm {
  motivo?: string
}

export interface ContactForm {
  nombre: string
  email: string
  asunto: string
  mensaje: string
}

// Para validación de formularios
export interface ValidationError {
  field: string
  message: string
  rule?: string
}

export interface FormState<T> {
  values: T
  errors: Record<string, string>
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
  submitCount: number
}