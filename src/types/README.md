# TypeScript Types Documentation

## Visión General

Este directorio contiene todos los tipos, interfaces y enums de TypeScript utilizados en la aplicación frontend del Sistema de Gestión de Biblioteca. Los tipos están organizados por responsabilidad y siguen las convenciones establecidas en las reglas del proyecto.

## Estructura de Archivos

| Archivo | Propósito | Importaciones Clave |
|---------|-----------|---------------------|
| `enums.ts` | Enumeraciones para estados y roles | `UserRole`, `PrestamoEstado`, `NotificationType`, etc. |
| `models.types.ts` | Interfaces principales de entidades del dominio | `User`, `Libro`, `Prestamo`, `Mensaje`, etc. |
| `api.types.ts` | Tipos para comunicación con API | `ApiResponse`, `PaginatedResponse`, DTOs, filtros |
| `form.types.ts` | Tipos para formularios y validación | `LoginForm`, `RegisterForm`, `LibroForm`, etc. |
| `ui.types.ts` | Tipos para componentes UI | `BreadcrumbItem`, `TableColumn`, `ModalProps`, etc. |
| `store.types.ts` | Tipos para stores de Pinia | `AuthState`, `LibroState`, acciones, getters |
| `socket.types.ts` | Tipos para Socket.IO | `SocketEvents`, `SocketServiceOptions`, eventos |
| `utils.ts` | Funciones utilitarias y type guards | `isUser`, `mapLibroFromApi`, helpers, validaciones |

## Convenciones de Nomenclatura

### Sufijos Comunes

- **DTO** (Data Transfer Object): Para objetos enviados/recibidos de la API
  - Ejemplo: `CreateLibroDTO`, `UpdateLibroDTO`
- **Form**: Para estructuras de formularios con VeeValidate
  - Ejemplo: `LoginForm`, `RegisterForm`
- **State**: Para estados de stores de Pinia
  - Ejemplo: `AuthState`, `LibroState`
- **Props**: Para propiedades de componentes UI
  - Ejemplo: `ModalProps`, `ButtonProps`

### Reglas para Interfaces vs Types

#### Usar `interface` cuando:
- Definas un objeto que será extendido o implementado
- Necesites declaración merging (poco común en nuestro caso)
- Definas props de componentes Vue
- Definas modelos de dominio principales

**Ejemplo:**
```typescript
export interface User {
  id: number
  email: string
  nombre: string
  apellidos: string
  roles: UserRole[]
}
```

#### Usar `type` cuando:
- Definas uniones o intersecciones
- Definas tipos para primitivos
- Necesites usar utility types (`Pick`, `Omit`, `Partial`, etc.)
- Definas tipos complejos que no sean objetos simples

**Ejemplo:**
```typescript
export type UserRole = 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_BIBLIOTECARIO'
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type ApiResponse<T> = { data: T; message?: string; status: number }
```

## Cómo Extender Tipos Existentes

### Extensión de Interfaces
```typescript
// Base interface
export interface BaseEntity {
  id: number
  fechaCreacion: string
  fechaActualizacion?: string
}

// Extending interface
export interface Libro extends BaseEntity {
  titulo: string
  descripcion: string
  // ... otras propiedades específicas
}
```

### Utility Types
```typescript
// Partial para formularios de actualización
export interface UpdateLibroDTO extends Partial<CreateLibroDTO> {
  id: number
}

// Pick para seleccionar propiedades específicas
export type LibroBasicInfo = Pick<Libro, 'id' | 'titulo' | 'autor'>

// Omit para excluir propiedades
export type LibroWithoutDates = Omit<Libro, 'fechaCreacion' | 'fechaActualizacion'>
```

## Ejemplos de Uso en Componentes

### Componente Vue con TypeScript
```typescript
<script setup lang="ts">
import type { Libro, User } from '@/types/models.types'
import type { ApiResponse } from '@/types/api.types'
import { isUser, mapLibroFromApi } from '@/types/utils'

interface Props {
  libro: Libro
  destacado?: boolean
}

interface Emits {
  (e: 'select', libro: Libro): void
  (e: 'delete', id: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Usando type guards
const handleApiResponse = (data: any) => {
  if (isUser(data)) {
    // data es tipo User aquí
    console.log(data.email)
  }
}

// Usando mappers
const libroTransformado = mapLibroFromApi(props.libro)
</script>
```

### Store de Pinia
```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/models.types'
import type { AuthState, AuthActions } from '@/types/store.types'

export const useAuthStore = defineStore('auth', () => {
  // State tipado
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getter tipado
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // Action tipada
  async function login(email: string, password: string): Promise<void> {
    // Implementación
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    // Getters
    isAuthenticated,
    // Actions
    login
  }
})
```

## Mejores Prácticas

### 1. Importar Tipos Correctamente
```typescript
// Correcto: usar 'import type' para tipos
import type { User } from '@/types/models.types'

// Incorrecto: importar como valor cuando solo se necesita tipo
import { User } from '@/types/models.types' // ❌
```

### 2. No Usar `any`
```typescript
// Correcto: usar tipos específicos o unknown
function processData(data: Libro): void { /* ... */ }

// Incorrecto: usar any sin justificación
function processData(data: any): void { /* ... */ } // ❌
```

### 3. Usar Type Guards para Validación
```typescript
// Correcto: usar type guards
function handleResponse(data: unknown) {
  if (isUser(data)) {
    // data es User aquí
    console.log(data.email)
  }
}

// Incorrecto: usar aserciones de tipo sin validación
function handleResponse(data: unknown) {
  const user = data as User // ❌
}
```

### 4. Documentar Tipos Complejos
```typescript
// Correcto: añadir comentarios para tipos complejos
export interface Prestamo {
  id: number
  usuario: User
  libro: Libro
  fechaPrestamo: string
  fechaDevolucionEsperada: string
  estadoPrestamo: PrestamoEstado
  renovaciones: number
  sancion: boolean
  diasRetraso?: number // días de retraso si está vencido
  diasRestantes?: number // días restantes para devolución (computed)
  puedeRenovar?: boolean // si puede ser renovado (computed)
}
```

## Integración con Backend

### Mapeo de Datos de API
```typescript
// Usar mappers para transformar datos de API
import { mapLibroFromApi, mapPrestamoFromApi } from '@/types/utils'

async function fetchLibro(id: number): Promise<Libro> {
  const response = await apiService.get(`/libros/${id}`)
  return mapLibroFromApi(response.data)
}

async function fetchPrestamo(id: number): Promise<Prestamo> {
  const response = await apiService.get(`/prestamos/${id}`)
  return mapPrestamoFromApi(response.data)
}
```

### Validación de Respuestas
```typescript
import { isUser, isLibro } from '@/types/utils'

async function fetchUserProfile(): Promise<User> {
  const response = await apiService.get('/user/profile')
  
  if (!isUser(response.data)) {
    throw new Error('Invalid user data received from API')
  }
  
  return response.data
}
```

## Troubleshooting

### Errores Comunes

1. **"Cannot use namespace as value"**
   ```typescript
   // Error: 'UserRole' cannot be used as a value
   const role: UserRole = UserRole.USER // ❌ si UserRole es import type
   
   // Solución: importar como valor
   import { UserRole } from './enums' // ✅
   ```

2. **Missing Properties**
   ```typescript
   // Asegurar que las interfaces coincidan con la API
   // Si el backend devuelve 'createdAt' pero la interfaz espera 'fechaCreacion'
   // usar mappers para transformar
   ```

3. **Circular Dependencies**
   ```typescript
   // Si A importa de B y B importa de A
   // Solución: usar import type o reestructurar tipos
   ```

## Actualización de Tipos

Cuando el backend cambie:
1. Actualizar las interfaces en `models.types.ts`
2. Actualizar DTOs en `api.types.ts` si es necesario
3. Actualizar mappers en `utils.ts` si cambian las transformaciones
4. Ejecutar `npm run type-check` para verificar compatibilidad
5. Actualizar stores y componentes afectados

## Recursos Adicionales

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Vue + TypeScript Guide](https://vuejs.org/guide/typescript/overview.html)
- [Pinia + TypeScript](https://pinia.vuejs.org/core-concepts/#typescript)