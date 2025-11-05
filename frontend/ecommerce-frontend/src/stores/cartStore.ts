import { defineStore } from 'pinia'

interface Product {
  id: number
  name: string
  price: number
  discount?: number
  image: string
  [key: string]: any
}

interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),
  
  getters: {
    totalItems: (state): number => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    
    totalPrice: (state): number => {
      return state.items.reduce((total, item) => {
        const price = item.product.discount 
          ? item.product.price * (1 - item.product.discount / 100)
          : item.product.price
        return total + (price * item.quantity)
      }, 0)
    },
    
    cartItemsCount: (state): number => state.items.length,
  },
  
  actions: {
    addToCart(product: Product, quantity: number = 1): void {
      const existingItem = this.items.find(item => item.product.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          product,
          quantity,
        })
      }
      
      this.saveToLocalStorage()
    },
    
    removeFromCart(productId: number): void {
      const index = this.items.findIndex(item => item.product.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveToLocalStorage()
      }
    },
    
    updateQuantity(productId: number, quantity: number): void {
      const item = this.items.find(item => item.product.id === productId)
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          this.saveToLocalStorage()
        }
      }
    },
    
    clearCart(): void {
      this.items = []
      this.saveToLocalStorage()
    },
    
    saveToLocalStorage(): void {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },
    
    loadFromLocalStorage(): void {
      const cart = localStorage.getItem('cart')
      if (cart) {
        this.items = JSON.parse(cart)
      }
    },
  },
})
