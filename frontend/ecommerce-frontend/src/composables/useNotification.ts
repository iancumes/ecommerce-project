import { ref } from 'vue'
import { useToast } from 'vue-toastification'

export function useNotification() {
  const toast = useToast()
  const loading = ref(false)

  const success = (message: string) => {
    toast.success(message)
  }

  const error = (message: string) => {
    toast.error(message)
  }

  const warning = (message: string) => {
    toast.warning(message)
  }

  const info = (message: string) => {
    toast.info(message)
  }

  return {
    loading,
    success,
    error,
    warning,
    info
  }
}
