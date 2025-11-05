import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import productService, { type Product, type Category } from '@/services/productService'

export const useProductStore = defineStore('product', () => {
  // State
  const products = ref<Product[]>([])
  const categories = ref<Category[]>([])
  const currentProduct = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const productsCount = computed(() => products.value.length)
  const featuredProducts = computed(() => 
    products.value.filter(p => p.rating && p.rating >= 4.5).slice(0, 8)
  )
  const discountedProducts = computed(() => 
    products.value.filter(p => p.discount && p.discount > 0)
  )

  // Actions
  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      products.value = await productService.getAllProducts()
    } catch (err) {
      error.value = 'Error al cargar los productos'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchProductById(id: number) {
    loading.value = true
    error.value = null
    try {
      currentProduct.value = await productService.getProductById(id)
      return currentProduct.value
    } catch (err) {
      error.value = 'Error al cargar el producto'
      console.error(err)
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    loading.value = true
    error.value = null
    try {
      categories.value = await productService.getCategories()
    } catch (err) {
      error.value = 'Error al cargar las categorías'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function searchProducts(query: string) {
    loading.value = true
    error.value = null
    try {
      products.value = await productService.searchProducts(query)
    } catch (err) {
      error.value = 'Error al buscar productos'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function filterProducts(filters: {
    category?: string
    minPrice?: number
    maxPrice?: number
    brand?: string
  }) {
    loading.value = true
    error.value = null
    try {
      products.value = await productService.filterProducts(filters)
    } catch (err) {
      error.value = 'Error al filtrar productos'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    products,
    categories,
    currentProduct,
    loading,
    error,
    // Getters
    productsCount,
    featuredProducts,
    discountedProducts,
    // Actions
    fetchProducts,
    fetchProductById,
    fetchCategories,
    searchProducts,
    filterProducts,
    clearError
  }
})
