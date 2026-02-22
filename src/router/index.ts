import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

// Import route configurations
import { authRoutes } from './routes/auth'
import { userRoutes } from './routes/user'
import { adminRoutes } from './routes/admin'

// Import views
const HomeView = () => import('@/views/HomeView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')
const ForbiddenView = () => import('@/views/ForbiddenView.vue')

// Route guard for authentication
function requireAuth(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const authStore = useAuthStore()
  
  if (!authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
}

// Route guard for admin access
function requireAdmin(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const authStore = useAuthStore()
  
  if (!authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (authStore.userRole !== 'ADMIN') {
    next({ name: 'forbidden' })
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public routes
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Inicio' }
    },
    
    // Auth routes
    ...authRoutes,
    
    // User routes
    ...userRoutes.map((route) => ({
      ...route,
      beforeEnter: requireAuth
    })),
    
    // Admin routes (create empty array if admin routes not defined)
    ...(adminRoutes || []).map((route) => ({
      ...route,
      beforeEnter: requireAdmin
    })),
    
    // Error routes
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView,
      meta: { title: 'Acceso Denegado' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: 'Página no encontrada' }
    }
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0 }
    }
  }
})

// Update document title on route change
router.beforeEach((to, _from, next) => {
  const appTitle = import.meta.env.VITE_APP_TITLE || 'Biblioteca'
  const pageTitle = to.meta?.title as string || ''
  document.title = pageTitle ? `${pageTitle} | ${appTitle}` : appTitle
  next()
})

// Global error handling
router.onError((error) => {
  console.error('Router error:', error)
  // You could redirect to an error page or show a notification here
})

export default router