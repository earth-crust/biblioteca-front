import { useToast as vueToast } from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'

/**
 * Composable para manejar notificaciones toast
 * 
 * @example
 * ```typescript
 * const toast = useToast()
 * toast.success('Operación exitosa')
 * toast.error('Ha ocurrido un error')
 * ```
 */
export function useToast() {
  const toast = vueToast()
  
  return {
    /**
     * Muestra un toast de éxito
     * @param message Mensaje a mostrar
     * @param options Opciones adicionales
     */
    success(message: string, options?: PluginOptions) {
      toast.success(message, options)
    },
    
    /**
     * Muestra un toast de error
     * @param message Mensaje a mostrar
     * @param options Opciones adicionales
     */
    error(message: string, options?: PluginOptions) {
      toast.error(message, options)
    },
    
    /**
     * Muestra un toast de advertencia
     * @param message Mensaje a mostrar
     * @param options Opciones adicionales
     */
    warning(message: string, options?: PluginOptions) {
      toast.warning(message, options)
    },
    
    /**
     * Muestra un toast informativo
     * @param message Mensaje a mostrar
     * @param options Opciones adicionales
     */
    info(message: string, options?: PluginOptions) {
      toast.info(message, options)
    },
    
    /**
     * Elimina todos los toasts
     */
    clear() {
      toast.clear()
    }
  }
}

export type Toast = ReturnType<typeof useToast>