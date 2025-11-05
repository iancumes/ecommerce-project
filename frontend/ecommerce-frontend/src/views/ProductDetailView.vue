<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useToast } from 'vue-toastification'
import {
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

const quantity = ref(1)
const selectedImage = ref(0)
const isFavorite = ref(false)

// Datos dummy del producto
const product = ref({
  id: parseInt(route.params.id as string),
  name: 'MacBook Pro 16" M3 Max',
  brand: 'Apple',
  price: 59999,
  discount: 10,
  rating: 5,
  reviews: 234,
  inStock: true,
  stock: 15,
  sku: 'APPLE-MBP16-M3MAX-001',
  images: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800',
  ],
  description: 'La MacBook Pro de 16 pulgadas con chip M3 Max ofrece un rendimiento excepcional para profesionales creativos y desarrolladores. Con hasta 36GB de RAM y 1TB de almacenamiento SSD.',
  specs: {
    'Procesador': 'Apple M3 Max',
    'RAM': '36GB unificada',
    'Almacenamiento': '1TB SSD',
    'Pantalla': '16.2" Liquid Retina XDR (3456x2234)',
    'Gráficos': 'GPU de 30 núcleos',
    'Batería': 'Hasta 21 horas',
    'Sistema Operativo': 'macOS Sonoma',
    'Peso': '2.15 kg',
    'Puertos': '3x Thunderbolt 4, HDMI, MagSafe 3',
    'Conectividad': 'Wi-Fi 6E, Bluetooth 5.3'
  },
  features: [
    'Rendimiento profesional con chip M3 Max',
    'Pantalla XDR con brillo de hasta 1600 nits',
    'Sistema de sonido de seis altavoces',
    'Teclado Magic Keyboard retroiluminado',
    'Touch ID integrado',
    'Cámara FaceTime HD 1080p',
    'Hasta 21 horas de batería'
  ]
})

const finalPrice = computed(() => {
  return product.value.discount 
    ? product.value.price * (1 - product.value.discount / 100) 
    : product.value.price
})

const savings = computed(() => {
  return product.value.discount 
    ? product.value.price - finalPrice.value 
    : 0
})

const addToCart = () => {
  cartStore.addToCart(product.value as any, quantity.value)
  toast.success(`${quantity.value} ${product.value.name} agregado(s) al carrito`)
}

const buyNow = () => {
  addToCart()
  router.push('/checkout')
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  toast.info(isFavorite.value ? 'Agregado a favoritos' : 'Eliminado de favoritos')
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="mb-8 flex items-center space-x-2 text-sm text-gray-600">
        <button @click="router.push('/')" class="hover:text-black">Inicio</button>
        <span>/</span>
        <button @click="router.push('/products')" class="hover:text-black">Productos</button>
        <span>/</span>
        <span class="text-black font-medium">{{ product.name }}</span>
      </nav>

      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Images Gallery -->
        <div>
          <!-- Main Image -->
          <div class="bg-white rounded-xl overflow-hidden shadow-lg mb-4">
            <img 
              :src="product.images[selectedImage]" 
              :alt="product.name"
              class="w-full aspect-square object-cover"
            />
          </div>

          <!-- Thumbnails -->
          <div class="grid grid-cols-4 gap-4">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="selectedImage = index"
              class="bg-white rounded-lg overflow-hidden border-2 transition-all hover:shadow-lg"
              :class="selectedImage === index ? 'border-black' : 'border-gray-200'"
            >
              <img 
                :src="image" 
                :alt="`${product.name} - ${index + 1}`"
                class="w-full aspect-square object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <!-- Brand & SKU -->
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-semibold text-gray-600 uppercase">{{ product.brand }}</span>
            <span class="text-xs text-gray-500">SKU: {{ product.sku }}</span>
          </div>

          <!-- Title -->
          <h1 class="text-3xl md:text-4xl font-bold text-black mb-4">
            {{ product.name }}
          </h1>

          <!-- Rating -->
          <div class="flex items-center space-x-3 mb-6">
            <div class="flex items-center">
              <StarIcon 
                v-for="i in 5" 
                :key="i"
                class="w-5 h-5"
                :class="i <= product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'"
              />
            </div>
            <span class="text-sm text-gray-600">{{ product.rating }}.0 | {{ product.reviews }} reseñas</span>
          </div>

          <!-- Price -->
          <div class="bg-gray-100 rounded-xl p-6 mb-6">
            <div class="flex items-baseline space-x-3 mb-2">
              <span class="text-4xl font-bold text-black">
                ${{ finalPrice.toLocaleString('es-MX') }}
              </span>
              <span 
                v-if="product.discount"
                class="text-xl text-gray-500 line-through"
              >
                ${{ product.price.toLocaleString('es-MX') }}
              </span>
              <span 
                v-if="product.discount"
                class="bg-black text-white px-3 py-1 rounded-full text-sm font-bold"
              >
                -{{ product.discount }}%
              </span>
            </div>
            
            <p v-if="savings > 0" class="text-sm text-green-600 font-medium mb-3">
              Ahorras: ${{ savings.toLocaleString('es-MX') }}
            </p>

            <p class="text-sm text-gray-600">
              12 MSI de ${{ (finalPrice / 12).toLocaleString('es-MX', { minimumFractionDigits: 2 }) }}
            </p>
          </div>

          <!-- Stock Status -->
          <div class="flex items-center space-x-2 mb-6">
            <CheckCircleIcon class="w-5 h-5 text-green-500" />
            <span class="text-green-600 font-medium">
              {{ product.stock }} unidades disponibles
            </span>
          </div>

          <!-- Description -->
          <p class="text-gray-700 mb-6 leading-relaxed">
            {{ product.description }}
          </p>

          <!-- Quantity & Actions -->
          <div class="space-y-4 mb-8">
            <!-- Quantity Selector -->
            <div class="flex items-center space-x-4">
              <label class="font-semibold">Cantidad:</label>
              <div class="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                <button 
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <input 
                  type="number" 
                  v-model.number="quantity" 
                  min="1" 
                  :max="product.stock"
                  class="w-16 text-center border-0 focus:outline-none"
                />
                <button 
                  @click="quantity = Math.min(product.stock, quantity + 1)"
                  class="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3">
              <button 
                @click="addToCart"
                class="flex-1 btn-secondary flex items-center justify-center space-x-2"
              >
                <ShoppingCartIcon class="w-5 h-5" />
                <span>Agregar al Carrito</span>
              </button>

              <button 
                @click="buyNow"
                class="flex-1 btn-primary"
              >
                Comprar Ahora
              </button>

              <button 
                @click="toggleFavorite"
                class="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-red-500 hover:bg-red-50 transition-all"
                :class="{ 'border-red-500 bg-red-50': isFavorite }"
              >
                <HeartIconSolid v-if="isFavorite" class="w-6 h-6 text-red-500" />
                <HeartIcon v-else class="w-6 h-6" />
              </button>
            </div>
          </div>

          <!-- Benefits -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div class="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
              <TruckIcon class="w-6 h-6 text-gray-700 flex-shrink-0" />
              <div>
                <p class="text-xs font-semibold">Envío Gratis</p>
                <p class="text-xs text-gray-600">En compras +$1,000</p>
              </div>
            </div>

            <div class="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
              <ShieldCheckIcon class="w-6 h-6 text-gray-700 flex-shrink-0" />
              <div>
                <p class="text-xs font-semibold">Garantía</p>
                <p class="text-xs text-gray-600">1 año oficial</p>
              </div>
            </div>

            <div class="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
              <ArrowPathIcon class="w-6 h-6 text-gray-700 flex-shrink-0" />
              <div>
                <p class="text-xs font-semibold">Devoluciones</p>
                <p class="text-xs text-gray-600">30 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs Section -->
      <div class="mt-16">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- Specs -->
          <div class="p-8">
            <h2 class="text-2xl font-bold mb-6">Especificaciones Técnicas</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div 
                v-for="(value, key) in product.specs" 
                :key="key"
                class="flex items-start py-3 border-b border-gray-200 last:border-0"
              >
                <span class="font-semibold text-gray-700 w-40 flex-shrink-0">{{ key }}:</span>
                <span class="text-gray-600">{{ value }}</span>
              </div>
            </div>
          </div>

          <!-- Features -->
          <div class="p-8 bg-gray-50 border-t border-gray-200">
            <h2 class="text-2xl font-bold mb-6">Características Destacadas</h2>
            <ul class="grid md:grid-cols-2 gap-4">
              <li 
                v-for="(feature, index) in product.features" 
                :key="index"
                class="flex items-start space-x-3"
              >
                <CheckCircleIcon class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span class="text-gray-700">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
