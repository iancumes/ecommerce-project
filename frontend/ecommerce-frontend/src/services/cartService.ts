import apiClient from './api'
import type { Product } from './productService'

export interface CartItem {
  id: number
  product: Product
  quantity: number
}

export interface Cart {
  id: number
  items: CartItem[]
  total: number
}

class CartService {
  async getCart(): Promise<Cart> {
    const response = await apiClient.get('/cart/')
    return response.data
  }

  async addToCart(productId: number, quantity: number = 1): Promise<CartItem> {
    const response = await apiClient.post('/cart/add/', {
      product_id: productId,
      quantity
    })
    return response.data
  }

  async updateCartItem(itemId: number, quantity: number): Promise<CartItem> {
    const response = await apiClient.patch(`/cart/items/${itemId}/`, {
      quantity
    })
    return response.data
  }

  async removeFromCart(itemId: number): Promise<void> {
    await apiClient.delete(`/cart/items/${itemId}/`)
  }

  async clearCart(): Promise<void> {
    await apiClient.post('/cart/clear/')
  }
}

export default new CartService()
