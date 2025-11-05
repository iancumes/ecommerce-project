<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useToast } from 'vue-toastification'
import {
  TrashIcon,
  ShoppingBagIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

const updateQuantity = (productId: number, newQuantity: number) => {
  if (newQuantity <= 0) {
    removeItem(productId)
  } else {
    cartStore.updateQuantity(productId, newQuantity)
  }
}

const removeItem = (productId: number) => {
  cartStore.removeFromCart(productId)
  toast.success('Producto eliminado del carrito')
}

const clearCart = () => {
  if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
    cartStore.clearCart()
    toast.success('Carrito vaciado')
  }
}

const proceedToCheckout = () => {
  router.push('/checkout')
}

const continueShopping = () => {
  router.push('/products')
}

const shipping = computed(() => {
  return cartStore.totalPrice >= 1000 ? 0 : 200
})

const subtotal = computed(() => cartStore.totalPrice)
const total = computed(() => subtotal.value + shipping.value)
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Carrito de Compras</h1>
        <p class="text-gray-600">
          {{ cartStore.totalItems }} {{ cartStore.totalItems === 1 ? 'producto' : 'productos' }}
        </p>
      </div>

      <!-- Empty Cart -->
      <div v-if="cartStore.items.length === 0" class="bg-white rounded-xl shadow-lg p-12 text-center">
        <div class="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <ShoppingBagIcon class="w-12 h-12 text-gray-400" />
        </div>
        <h2 class="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <p class="text-gray-600 mb-8">
          ¡Agrega productos increíbles a tu carrito y comienza a comprar!
        </p>
        <button 
          @click="router.push('/products')"
          class="btn-primary"
        >
          Ir a Comprar
        </button>
      </div>

      <!-- Cart Content -->
      <div v-else class="grid lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Clear Cart Button -->
          <div class="flex justify-end">
            <button 
              @click="clearCart"
              class="text-sm text-red-600 hover:text-red-700 font-medium flex items-center space-x-2"
            >
              <TrashIcon class="w-4 h-4" />
              <span>Vaciar carrito</span>
            </button>
          </div>

          <!-- Cart Items List -->
          <div 
            v-for="item in cartStore.items" 
            :key="item.product.id"
            class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center space-x-6">
              <!-- Product Image -->
              <img 
                :src="item.product.image || 'https://via.placeholder.com/150'" 
                :alt="item.product.name"
                class="w-24 h-24 object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-75 transition-opacity"
                @click="router.push(`/product/${item.product.id}`)"
              />

              <!-- Product Info -->
              <div class="flex-1 min-w-0">
                <h3 
                  class="font-semibold text-lg mb-1 cursor-pointer hover:text-gray-600 transition-colors truncate"
                  @click="router.push(`/product/${item.product.id}`)"
                >
                  {{ item.product.name }}
                </h3>
                <p class="text-sm text-gray-600 mb-3">
                  {{ item.product.category }}
                </p>

                <!-- Mobile Price -->
                <div class="sm:hidden mb-3">
                  <p class="text-xl font-bold">${{ (item.product.price * item.quantity).toLocaleString('es-MX') }}</p>
                  <p class="text-sm text-gray-600">${{ item.product.price.toLocaleString('es-MX') }} c/u</p>
                </div>

                <!-- Quantity Controls -->
                <div class="flex items-center space-x-4">
                  <div class="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                    <button 
                      @click="updateQuantity(item.product.id, item.quantity - 1)"
                      class="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      :value="item.quantity" 
                      @change="(e) => updateQuantity(item.product.id, parseInt((e.target as HTMLInputElement).value))"
                      min="1"
                      class="w-16 text-center border-0 focus:outline-none"
                    />
                    <button 
                      @click="updateQuantity(item.product.id, item.quantity + 1)"
                      class="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button 
                    @click="removeItem(item.product.id)"
                    class="text-red-600 hover:text-red-700 flex items-center space-x-1 text-sm font-medium"
                  >
                    <TrashIcon class="w-4 h-4" />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>

              <!-- Desktop Price -->
              <div class="hidden sm:block text-right flex-shrink-0">
                <p class="text-2xl font-bold mb-1">
                  ${{ (item.product.price * item.quantity).toLocaleString('es-MX') }}
                </p>
                <p class="text-sm text-gray-600">
                  ${{ item.product.price.toLocaleString('es-MX') }} c/u
                </p>
              </div>
            </div>
          </div>

          <!-- Continue Shopping -->
          <button 
            @click="continueShopping"
            class="w-full sm:w-auto btn-secondary"
          >
            Continuar Comprando
          </button>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h2 class="text-xl font-bold mb-6">Resumen de Compra</h2>

            <!-- Summary Items -->
            <div class="space-y-4 mb-6">
              <div class="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span class="font-semibold">${{ subtotal.toLocaleString('es-MX') }}</span>
              </div>

              <div class="flex justify-between text-gray-700">
                <span>Envío:</span>
                <span class="font-semibold">
                  {{ shipping === 0 ? 'GRATIS' : `$${shipping.toLocaleString('es-MX')}` }}
                </span>
              </div>

              <div v-if="subtotal >= 1000" class="flex items-center space-x-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                <TruckIcon class="w-5 h-5" />
                <span>¡Envío gratis incluido!</span>
              </div>

              <div v-else class="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                Agrega ${{ (1000 - subtotal).toLocaleString('es-MX') }} más para envío gratis
              </div>

              <div class="border-t border-gray-200 pt-4">
                <div class="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>${{ total.toLocaleString('es-MX') }}</span>
                </div>
                <p class="text-sm text-gray-600 mt-1">
                  O 12 MSI de ${{ (total / 12).toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
                </p>
              </div>
            </div>

            <!-- Checkout Button -->
            <button 
              @click="proceedToCheckout"
              class="w-full btn-primary flex items-center justify-center space-x-2 mb-4"
            >
              <span>Proceder al Pago</span>
              <ArrowRightIcon class="w-5 h-5" />
            </button>

            <!-- Benefits -->
            <div class="space-y-3 pt-4 border-t border-gray-200">
              <div class="flex items-center space-x-3 text-sm text-gray-600">
                <TruckIcon class="w-5 h-5 flex-shrink-0" />
                <span>Envío gratis en compras +$1,000</span>
              </div>
              <div class="flex items-center space-x-3 text-sm text-gray-600">
                <ShieldCheckIcon class="w-5 h-5 flex-shrink-0" />
                <span>Compra 100% segura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
