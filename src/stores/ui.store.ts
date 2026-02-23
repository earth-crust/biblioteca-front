import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { BreadcrumbItem } from '@/types/ui.types'

export const useUIStore = defineStore('ui', () => {
  // State
  const sidebarOpen = ref(true)
  const theme = ref<'light' | 'dark'>('light')
  const breadcrumbs = ref<BreadcrumbItem[]>([])
  const loading = ref(false)

  // Actions
  function toggleSidebar(): void {
    sidebarOpen.value = !sidebarOpen.value
  }

  function setSidebarOpen(value: boolean): void {
    sidebarOpen.value = value
  }

  function setTheme(newTheme: 'light' | 'dark'): void {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    
    // Aplicar tema al HTML
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function setBreadcrumbs(items: BreadcrumbItem[]): void {
    breadcrumbs.value = items
  }

  function setLoading(value: boolean): void {
    loading.value = value
  }

  function initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }

  return {
    sidebarOpen,
    theme,
    breadcrumbs,
    loading,
    toggleSidebar,
    setSidebarOpen,
    setTheme,
    setBreadcrumbs,
    setLoading,
    initializeTheme
  }
})