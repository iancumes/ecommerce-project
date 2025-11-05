<script setup lang="ts">
import { ref } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { ClockIcon, FireIcon } from '@heroicons/vue/24/outline'

const deals = ref([
  {
    id: 101,
    name: 'MacBook Air M2 - Oferta Flash',
    price: 29999,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600',
    category: 'Laptops',
    rating: 5,
    reviews: 145,
    inStock: true,
    endsIn: '2 días'
  },
  {
    id: 102,
    name: 'ASUS TUF Gaming - Última Unidad',
    price: 32999,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600',
    category: 'Gaming',
    rating: 4,
    reviews: 98,
    inStock: true,
    endsIn: '5 horas'
  },
  {
    id: 103,
    name: 'Dell Inspiron 15 - Clearance',
    price: 19999,
    discount: 35,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600',
    category: 'Laptops',
    rating: 4,
    reviews: 67,
    inStock: true,
    endsIn: '1 día'
  }
])
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="flex items-center justify-center space-x-3 mb-4">
          <FireIcon class="w-12 h-12 text-red-500" />
          <h1 class="text-4xl font-bold">Ofertas Especiales</h1>
        </div>
        <p class="text-xl text-gray-600">Aprovecha descuentos de hasta 35% en productos seleccionados</p>
      </div>

      <!-- Deals Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard 
          v-for="product in deals" 
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- Banner -->
      <div class="mt-16 bg-gradient-to-r from-black to-gray-800 rounded-2xl p-12 text-center text-white">
        <ClockIcon class="w-16 h-16 mx-auto mb-4" />
        <h2 class="text-3xl font-bold mb-4">Ofertas por Tiempo Limitado</h2>
        <p class="text-xl mb-6">No te pierdas nuestras mejores ofertas. ¡Se acaban rápido!</p>
        <button class="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all">
          Ver Todas las Ofertas
        </button>
      </div>
    </div>
  </div>
</template>
