import type { NotificationType } from './enums'

// Para componentes UI
export interface BreadcrumbItem {
  label: string
  to?: string
  icon?: string
}

export interface TableColumn<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  filterable?: boolean
  formatter?: (value: any, row: T) => string | number | boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  visible?: boolean
  render?: (row: T) => any
}

export interface ModalProps {
  title: string
  visible: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  persistent?: boolean
  closable?: boolean
  backdrop?: boolean
}

export interface TabItem {
  key: string
  label: string
  icon?: string
  badge?: number
  disabled?: boolean
  hidden?: boolean
}

export interface SelectOption {
  value: string | number | boolean
  label: string
  disabled?: boolean
  icon?: string
  group?: string
}

export interface ToastOptions {
  type: NotificationType
  message: string
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  dismissible?: boolean
  queue?: boolean
}

export interface PaginationState {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface SortState {
  field: string
  direction: 'asc' | 'desc'
}

export interface FilterState {
  [key: string]: any
}

export interface DropdownItem {
  label: string
  icon?: string
  action?: () => void
  to?: string
  disabled?: boolean
  divider?: boolean
  danger?: boolean
}

export interface CardProps {
  title?: string
  subtitle?: string
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  border?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  closable?: boolean
  icon?: boolean
}

export interface BadgeProps {
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
  variant?: 'solid' | 'outline' | 'subtle'
  rounded?: boolean
}

export interface StepperItem {
  title: string
  description?: string
  icon?: string
  completed?: boolean
  active?: boolean
  disabled?: boolean
}

// Para componentes de formulario
export interface InputProps {
  modelValue?: any
  type?: string
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  autocomplete?: string
  size?: 'sm' | 'md' | 'lg'
}

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  block?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
}