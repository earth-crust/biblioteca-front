import type { RouteRecordRaw } from 'vue-router'

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/catalogo',
    name: 'catalogo',
    component: () => import('@/features/libros/views/CatalogoView.vue'),
    meta: { title: 'Catálogo de Libros' }
  },
  {
    path: '/libros/:id',
    name: 'libro-detalle',
    component: () => import('@/features/libros/views/LibroDetalleView.vue'),
    meta: { title: 'Detalle del Libro' }
  },
  {
    path: '/prestamos',
    name: 'prestamos',
    component: () => import('@/features/prestamos/views/PrestamosView.vue'),
    meta: { title: 'Mis Préstamos' }
  },
  {
    path: '/mensajes',
    name: 'mensajes',
    component: () => import('@/features/mensajes/views/MensajesView.vue'),
    meta: { title: 'Mensajes' }
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('@/features/auth/views/ProfileView.vue'),
    meta: { title: 'Mi Perfil' }
  }
]