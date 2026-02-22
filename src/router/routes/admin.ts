import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/features/admin/views/AdminDashboardView.vue'),
    meta: { title: 'Panel de Administración' }
  },
  {
    path: '/admin/libros',
    name: 'admin-libros',
    component: () => import('@/features/admin/views/LibrosAdminView.vue'),
    meta: { title: 'Gestión de Libros' }
  },
  {
    path: '/admin/usuarios',
    name: 'admin-usuarios',
    component: () => import('@/features/admin/views/UsuariosAdminView.vue'),
    meta: { title: 'Gestión de Usuarios' }
  },
  {
    path: '/admin/prestamos',
    name: 'admin-prestamos',
    component: () => import('@/features/admin/views/PrestamosAdminView.vue'),
    meta: { title: 'Gestión de Préstamos' }
  },
  {
    path: '/admin/reportes',
    name: 'admin-reportes',
    component: () => import('@/features/admin/views/ReportesView.vue'),
    meta: { title: 'Reportes y Estadísticas' }
  }
]