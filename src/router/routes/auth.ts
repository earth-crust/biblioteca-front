import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/features/auth/views/LoginView.vue'),
    meta: { 
      title: 'Iniciar Sesión',
      guestOnly: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/features/auth/views/RegisterView.vue'),
    meta: { 
      title: 'Registrarse',
      guestOnly: true
    }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/features/auth/views/ForgotPasswordView.vue'),
    meta: { 
      title: 'Recuperar Contraseña',
      guestOnly: true
    }
  },
  {
    path: '/reset-password/:token',
    name: 'reset-password',
    component: () => import('@/features/auth/views/ResetPasswordView.vue'),
    meta: { 
      title: 'Restablecer Contraseña',
      guestOnly: true
    }
  }
]