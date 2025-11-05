<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useToast } from 'vue-toastification'
import { ShoppingCartIcon, HeartIcon, StarIcon } from '@heroicons/vue/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category?: string
  rating?: number
  reviews?: number
  inStock?: boolean
  discount?: number
}

const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

const isFavorite = ref(false)
const isHovered = ref(false)

const addToCart = (e: Event) => {
  e.stopPropagation()
  cartStore.addToCart(props.product, 1)
  toast.success(`${props.product.name} agregado al carrito`)
}

const toggleFavorite = (e: Event) => {
  e.stopPropagation()
  isFavorite.value = !isFavorite.value
  toast.info(isFavorite.value ? 'Agregado a favoritos' : 'Eliminado de favoritos')
}

const viewProduct = () => {
  router.push(`/product/${props.product.id}`)
}

const finalPrice = props.product.discount 
  ? props.product.price * (1 - props.product.discount / 100) 
  : props.product.price
</script>

<template>
  <div 
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="viewProduct"
    class="card group cursor-pointer overflow-hidden"
  >
    <!-- Image Container -->
    <div class="relative aspect-square overflow-hidden bg-gray-100">
      <img 
        :src="product.image" 
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span 
          v-if="product.discount"
          class="bg-black text-white px-3 py-1 rounded-full text-xs font-bold"
        >
          -{{ product.discount }}%
        </span>
        <span 
          v-if="!product.inStock"
          class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"
        >
          Agotado
        </span>
      </div>

      <!-- Favorite Button -->
      <button 
        @click="toggleFavorite"
        class="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200"
        :class="{ 'bg-red-50': isFavorite }"
      >
        <HeartIconSolid v-if="isFavorite" class="w-5 h-5 text-red-500" />
        <HeartIcon v-else class="w-5 h-5 text-gray-700" />
      </button>

      <!-- Quick Add to Cart Button (Shows on Hover) -->
      <div 
        class="absolute bottom-0 left-0 right-0 p-4 transform transition-all duration-300"
        :class="isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'"
      >
        <button 
          @click="addToCart"
          :disabled="!product.inStock"
          class="w-full btn-primary flex items-center justify-center space-x-2"
          :class="{ 'opacity-50 cursor-not-allowed': !product.inStock }"
        >
          <ShoppingCartIcon class="w-5 h-5" />
          <span>{{ product.inStock ? 'Agregar al Carrito' : 'No Disponible' }}</span>
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <!-- Category -->
      <p v-if="product.category" class="text-xs text-gray-500 uppercase font-semibold mb-1">
        {{ product.category }}
      </p>

      <!-- Name -->
      <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors">
        {{ product.name }}
      </h3>

      <!-- Rating -->
      <div v-if="product.rating" class="flex items-center space-x-1 mb-3">
        <div class="flex items-center">
          <StarIcon 
            v-for="i in 5" 
            :key="i"
            class="w-4 h-4"
            :class="i <= product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
          />
        </div>
        <span class="text-xs text-gray-500">({{ product.reviews }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-center space-x-2">
        <span class="text-2xl font-bold text-black">
          ${{ finalPrice.toLocaleString('es-MX') }}
        </span>
        <span 
          v-if="product.discount"
          class="text-sm text-gray-400 line-through"
        >
          ${{ product.price.toLocaleString('es-MX') }}
        </span>
      </div>

      <!-- MSI Info -->
      <p class="text-xs text-gray-500 mt-2">
        12 meses sin intereses de ${{ (finalPrice / 12).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
      </p>
    </div>
  </div>
</template>
