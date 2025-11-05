import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService, { type User, type LoginCredentials, type RegisterData } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const userName = computed(() => user.value?.first_name || user.value?.username || '')

  // Actions
  async function login(credentials: LoginCredentials) {
    loading.value = true
    error.value = null
    try {
      await authService.login(credentials)
      await fetchCurrentUser()
      return true
    } catch (err: any) {
      error.value = err.response?.data?.detail || 'Error al iniciar sesión'
      console.error(err)
      return false
    } finally {
      loading.value = false
    }
  }

  async function register(data: RegisterData) {
    loading.value = true
    error.value = null
    try {
      user.value = await authService.register(data)
      return true
    } catch (err: any) {
      error.value = err.response?.data?.detail || 'Error al registrarse'
      console.error(err)
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    await authService.logout()
    user.value = null
  }

  async function fetchCurrentUser() {
    if (!authService.isAuthenticated()) {
      return
    }

    loading.value = true
    error.value = null
    try {
      user.value = await authService.getCurrentUser()
    } catch (err) {
      error.value = 'Error al cargar el usuario'
      console.error(err)
      // Si falla, limpiar la sesión
      await logout()
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  // Inicializar usuario si hay token
  function initialize() {
    if (authService.isAuthenticated()) {
      fetchCurrentUser()
    }
  }

  return {
    // State
    user,
    loading,
    error,
    // Getters
    isAuthenticated,
    userName,
    // Actions
    login,
    register,
    logout,
    fetchCurrentUser,
    clearError,
    initialize
  }
})
