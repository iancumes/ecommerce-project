import apiClient from './api'
import type { Product } from './productService'

export interface ShippingAddress {
  full_name: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country: string
  phone: string
}

export interface OrderItem {
  product: Product
  quantity: number
  price: number
}

export interface Order {
  id: number
  order_number: string
  items: OrderItem[]
  shipping_address: ShippingAddress
  subtotal: number
  shipping_cost: number
  tax: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_method: string
  created_at: string
  updated_at: string
}

export interface CreateOrderData {
  shipping_address: ShippingAddress
  payment_method: string
  items: Array<{
    product_id: number
    quantity: number
  }>
}

class OrderService {
  async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await apiClient.post('/orders/', data)
    return response.data
  }

  async getOrders(): Promise<Order[]> {
    const response = await apiClient.get('/orders/')
    return response.data
  }

  async getOrderById(id: number): Promise<Order> {
    const response = await apiClient.get(`/orders/${id}/`)
    return response.data
  }

  async cancelOrder(id: number): Promise<Order> {
    const response = await apiClient.post(`/orders/${id}/cancel/`)
    return response.data
  }
}

export default new OrderService()
