# Sistema de Gestión de Biblioteca - Frontend

Vue 3 + TypeScript + Vite frontend application for library management system.

## 🚀 Características

- **Vue 3.4+** con Composition API (`<script setup lang="ts">`)
- **TypeScript 5+** en modo strict
- **Vite 5+** como bundler y dev server
- **Tailwind CSS 3+** para estilos
- **Pinia** para gestión de estado
- **Vue Router 4+** para navegación
- **Axios** para peticiones HTTP
- **Socket.IO Client** para comunicación en tiempo real
- **VeeValidate + Yup** para validación de formularios
- **Vue Toastification** para notificaciones
- **Day.js** para manejo de fechas

## 📁 Estructura del Proyecto

```
src/
├── assets/              # Assets estáticos
├── components/          # Componentes reutilizables
│   ├── common/         # Button, Input, Card
│   ├── layout/         # Header, Footer, Sidebar
│   └── ui/             # Modal, Dropdown, Tooltip
├── composables/         # Composables reutilizables
├── features/            # Módulos por funcionalidad
│   ├── auth/           # Autenticación
│   ├── libros/         # Catálogo de libros
│   ├── prestamos/      # Sistema de préstamos
│   ├── mensajes/       # Chat y mensajería
│   └── admin/          # Panel administrativo
├── layouts/             # Layouts principales
├── router/              # Configuración de rutas
├── services/            # Servicios para API calls
├── stores/              # Pinia stores
├── types/               # TypeScript types
├── utils/               # Utilidades y helpers
├── views/               # Vistas globales
├── App.vue
└── main.ts
```

## 🛠️ Instalación

### Prerrequisitos
- Node.js 18+
- npm 9+

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd biblioteca-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.development.example .env.development
   ```
   Editar `.env.development` con tus valores:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_WS_URL=http://localhost:3000
   VITE_APP_TITLE=Sistema de Gestión Biblioteca
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en navegador**
   ```
   http://localhost:5173
   ```

## 📦 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza build de producción |
| `npm run type-check` | Verifica tipos TypeScript |
| `npm run lint` | Ejecuta ESLint |
| `npm run format` | Formatea código con Prettier |
| `npm run test` | Ejecuta tests unitarios |

## 🔧 Configuración

### TypeScript
- Modo strict habilitado
- Path aliases configurados (`@/*`, `@/components/*`, etc.)
- Tipos definidos en `src/types/`

### Tailwind CSS
- Configuración personalizada en `tailwind.config.js`
- Fuente Inter incluida
- Tema de colores personalizado (primary, secondary, danger, success)

### Variables de Entorno
| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_API_BASE_URL` | URL base de la API | `http://localhost:8080/api` |
| `VITE_WS_URL` | URL WebSocket | `http://localhost:3000` |
| `VITE_APP_TITLE` | Título de la aplicación | `Sistema de Gestión Biblioteca` |

## 🏗️ Arquitectura

### Feature-Based Structure
La aplicación está organizada por funcionalidad en lugar de por tipo de archivo, lo que facilita el mantenimiento y escalabilidad.

### Componentes
- **Common Components**: Componentes reutilizables básicos
- **Layout Components**: Componentes de layout (Header, Footer, Sidebar)
- **UI Components**: Componentes de interfaz genéricos

### Composables
Lógica reusable extraída de componentes:
- `useAuth()`: Manejo de autenticación
- `useApi()`: Peticiones HTTP
- `useToast()`: Notificaciones
- `useModal()`: Modales

### Stores (Pinia)
- `auth.store`: Estado de autenticación
- `libro.store`: Estado de libros
- `prestamo.store`: Estado de préstamos
- `mensaje.store`: Estado de mensajes
- `ui.store`: Estado de UI

### Servicios
- `api.service`: Cliente HTTP con interceptores
- `auth.service`: Servicios de autenticación
- `libro.service`: Servicios de libros
- `socket.service`: Comunicación WebSocket

## 🔐 Autenticación

### Flujo de Autenticación
1. Login/Register con JWT tokens
2. Token almacenado en localStorage
3. Interceptor de Axios añade token automáticamente
4. Refresh token automático en 401

### Roles
- **USER**: Usuario regular
- **ADMIN**: Administrador del sistema
- **BIBLIOTECARIO**: Personal de biblioteca

## 🌐 API Integration

### Configuración
- Base URL configurable por entorno
- Timeout: 30 segundos
- Headers: Content-Type: application/json

### Manejo de Errores
- **401**: Logout automático
- **403**: Redirección a /forbidden
- **422**: Validación de formularios
- **500**: Error genérico

## 🎨 Estilos

### Tailwind CSS
- Mobile-first responsive design
- Dark mode support
- Componentes personalizados
- Animaciones y transiciones

### Colores
```javascript
// tailwind.config.js
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8'
  },
  secondary: { /* ... */ },
  danger: { /* ... */ },
  success: { /* ... */ }
}
```

## 🧪 Testing

### Unit Tests
- Vitest como framework de testing
- Tests ubicados en `src/**/__tests__/`
- Cobertura mínima: 60%

### E2E Tests
- Cypress para tests end-to-end
- Tests ubicados en `cypress/`

## 📱 Responsive Design

| Breakpoint | Descripción |
|------------|-------------|
| `sm` (640px) | Mobile |
| `md` (768px) | Tablet |
| `lg` (1024px) | Desktop |
| `xl` (1280px) | Desktop grande |
| `2xl` (1536px) | Desktop extra grande |

## 🔧 Desarrollo

### Convenciones de Código
- **Components**: PascalCase + `.vue` (`LibroCard.vue`)
- **Composables**: camelCase con prefijo `use` (`useAuth.ts`)
- **Variables**: camelCase (`const userName = 'John'`)
- **Constants**: UPPER_SNAKE_CASE (`const API_BASE_URL`)

### Git Workflow
- Conventional Commits
- Feature branches
- Code reviews obligatorios

## 🚀 Despliegue

### Build para Producción
```bash
npm run build
```

### Previsualizar Build
```bash
npm run preview
```

### Variables de Producción
Crear `.env.production`:
```env
VITE_API_BASE_URL=https://api.biblioteca.com/api
VITE_WS_URL=https://ws.biblioteca.com
VITE_APP_TITLE=Biblioteca
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

- **Issues**: [GitHub Issues](https://github.com/yourusername/biblioteca-frontend/issues)
- **Documentación**: [Wiki](https://github.com/yourusername/biblioteca-frontend/wiki)
- **Email**: soporte@biblioteca.com

---

**Nota**: Este proyecto está en desarrollo activo. Las APIs y estructuras pueden cambiar.