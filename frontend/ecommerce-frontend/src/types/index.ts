// Tipos globales para el proyecto

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
  slug?: string
}

export interface User {
  id: number
  username: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  avatar?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

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

export interface PaymentMethod {
  type: 'credit_card' | 'debit_card' | 'paypal' | 'transfer'
  card_number?: string
  card_holder?: string
  expiry_date?: string
  cvv?: string
}

export interface Order {
  id: number
  order_number: string
  user: User
  items: Array<{
    product: Product
    quantity: number
    price: number
  }>
  shipping_address: ShippingAddress
  payment_method: string
  subtotal: number
  shipping_cost: number
  tax: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface Review {
  id: number
  user: User
  product: Product
  rating: number
  comment: string
  created_at: string
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}
