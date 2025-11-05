import apiClient from './api'

export interface Product {
  id: number
  name: string
  description?: string
  price: number
  discount?: number
  image?: string
  category: string
  brand?: string
  rating?: number
  reviews?: number
  inStock?: boolean
  stock?: number
  specifications?: Record<string, any>
}

export interface Category {
  id: number
  name: string
  description?: string
}

class ProductService {
  async getAllProducts(): Promise<Product[]> {
    const response = await apiClient.get('/products/products/')
    return response.data
  }

  async getProductById(id: number): Promise<Product> {
    const response = await apiClient.get(`/products/products/${id}/`)
    return response.data
  }

  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get('/products/categories/')
    return response.data
  }

  async searchProducts(query: string): Promise<Product[]> {
    const response = await apiClient.get('/products/products/', {
      params: { search: query }
    })
    return response.data
  }

  async filterProducts(filters: {
    category?: string
    minPrice?: number
    maxPrice?: number
    brand?: string
  }): Promise<Product[]> {
    const response = await apiClient.get('/products/products/', {
      params: filters
    })
    return response.data
  }
}

export default new ProductService()
