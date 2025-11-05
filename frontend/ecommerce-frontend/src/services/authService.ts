import apiClient from './api'

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  first_name?: string
  last_name?: string
}

export interface User {
  id: number
  username: string
  email: string
  first_name?: string
  last_name?: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const response = await apiClient.post('/token/', credentials)
    const tokens = response.data
    
    localStorage.setItem('access_token', tokens.access)
    localStorage.setItem('refresh_token', tokens.refresh)
    
    return tokens
  }

  async register(data: RegisterData): Promise<User> {
    const response = await apiClient.post('/users/register/', data)
    return response.data
  }

  async logout(): Promise<void> {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get('/users/me/')
    return response.data
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token')
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token')
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token')
  }
}

export default new AuthService()
